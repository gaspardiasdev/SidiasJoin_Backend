import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/databases/connection/prisma.service';
import { hash, compare } from 'bcrypt';
import {
  CreateUserRequestDTO,
  UpdateUserRequestDTO,
  UserResponseDTO,
  UpdateEmailDTO,
  UpdatePasswordDTO,
  UpdateStatusDTO,
} from './user.dto';
import { UploadService } from 'src/utils/upload/upload.service';

@Injectable()
export class UserService {
  constructor(

    private prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) { }

  async create(data: CreateUserRequestDTO): Promise<UserResponseDTO> {
    const userExists = await this.findByEmail(data.email);
    if (userExists) throw new ConflictException('Email já está em uso');

    const passwordHash = await hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        location: data.location,
        imageUrl: data.imageUrl,
        passwordHash,
        role: data.role,
      },
    });

    return this.removeSensitiveFields(user);
  }

  async list(): Promise<UserResponseDTO[]> {
    const users = await this.prisma.user.findMany();
    return users.map(this.removeSensitiveFields);
  }

  async findById(id: number): Promise<UserResponseDTO> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return this.removeSensitiveFields(user);
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, data: UpdateUserRequestDTO): Promise<UserResponseDTO> {
    await this.ensureUserExists(id);

    const updated = await this.prisma.user.update({
      where: { id },
      data,
    });

    return this.removeSensitiveFields(updated);
  }

  async updatePhoto(id: number, file: Express.Multer.File): Promise<{message: string}> {
    await this.ensureUserExists(id);
    const imageUrl = await this.uploadService.uploadImage(file);
    await this.prisma.user.update({
      where: { id },
      data: { imageUrl },
    });
    return { message: 'Foto de perfil atualizada com sucesso.' };
  }


  async delete(id: number): Promise<{ message: string }> {
    await this.ensureUserExists(id);
    await this.prisma.user.delete({ where: { id } });
    return { message: 'Usuário deletado com sucesso' };
  }

  async updateEmail(userId: number, dto: UpdateEmailDTO) {
    await this.ensureUserExists(userId);
    const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existingUser && existingUser.id !== userId) {
      throw new BadRequestException('Este e-mail já está em uso por outro usuário.');
    }
    await this.prisma.user.update({
      where: { id: userId },
      data: { email: dto.email },
    });
    return { message: 'E-mail atualizado com sucesso.' };
  }

  async updatePassword(userId: number, dto: UpdatePasswordDTO) {
    const user = await this.ensureUserExists(userId);
    const isSame = await compare(dto.currentPassword, user.passwordHash);
    if (!isSame) {
      throw new BadRequestException('Senha atual incorreta.');
    }
    const newHashed = await hash(dto.newPassword, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newHashed },
    });
    return { message: 'Senha atualizada com sucesso.' };
  }

  async updateStatus(userId: number, data: UpdateStatusDTO) {
    await this.ensureUserExists(userId);
    await this.prisma.user.update({
      where: { id: userId },
      data: { status: data.status },
    });
    return { message: 'Status atualizada com sucesso.' };
  }

  // ========== Provider Services ==========

  async addProviderRole(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    if (user.role !== 'prestador') {
      await this.prisma.user.update({
        where: { id: userId },
        data: { role: 'prestador' },
      });
    }
  }

  async removeProviderRole(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    await this.prisma.providerService.deleteMany({ where: { providerId: userId } });
    await this.prisma.user.update({
      where: { id: userId },
      data: { role: 'cliente' },
    });
  }
  async addServicesToProvider(userId: number, serviceIds: number[]) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    if (user.role !== 'prestador') {
      throw new BadRequestException('Usuário não é um prestador de serviço');
    }

    await this.ensureServicesExist(serviceIds);

    const data = serviceIds.map(serviceId => ({
      providerId: userId,
      serviceId,
    }));

    await this.prisma.providerService.createMany({
      data,
      skipDuplicates: true,
    });
  }

  async removeServicesFromProvider(userId: number, serviceIds: number[]) {
    await Promise.all(
      serviceIds.map((serviceId) =>
        this.prisma.providerService.delete({
          where: {
            providerId_serviceId: {
              providerId: userId,
              serviceId,
            },
          },
        }),
      ),
    );
    return { message: 'Serviços removidos com sucesso.' };
  }

  async getServicesByProvider(userId: number) {
    const provider = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!provider) throw new NotFoundException('Usuário não encontrado');
    if (provider.role !== 'prestador') throw new BadRequestException('Usuário não é um prestador');

    const providerServices = await this.prisma.providerService.findMany({
      where: { providerId: userId },
      select: {
        primaryFlag: true,
        service: true,
      },
    });

    return providerServices.map((ps) => ({
      ...ps.service,
      primaryFlag: ps.primaryFlag,
    }));
  }


  async setPrimaryFlag(providerId: number, serviceId: number) {
    await this.ensureUserExists(providerId);
    const current = await this.prisma.providerService.findUnique({
      where: {
        providerId_serviceId: { providerId, serviceId },
      },
    });
    if (!current) throw new NotFoundException('Serviço não encontrado para esse provedor.');
    if (current.primaryFlag) {
      await this.prisma.providerService.update({
        where: {
          providerId_serviceId: { providerId, serviceId },
        },
        data: { primaryFlag: false },
      });
      return { message: 'Serviço deixou de ser o principal.' };
    }
    await this.prisma.providerService.updateMany({
      where: { providerId, primaryFlag: true },
      data: { primaryFlag: false },
    });
    await this.prisma.providerService.update({
      where: {
        providerId_serviceId: { providerId, serviceId },
      },
      data: { primaryFlag: true },
    });
    return { message: 'Serviço agora é o principal.' };
  }

  async updateVerificationStatus(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { verified: !user.verified },
    });

    return {
      message: `Status de verificação atualizado para: ${updatedUser.verified ? 'verificado' : 'não verificado'}.`,
    };
  }

  // ========== Helpers ==========

  private async ensureUserExists(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  private removeSensitiveFields(user: any): UserResponseDTO {
    const { passwordHash, ...rest } = user;
    return rest as UserResponseDTO;
  }

  private async ensureServicesExist(serviceIds: number[]) {
    const services = await this.prisma.service.findMany({
      where: { id: { in: serviceIds } },
      select: { id: true },
    });

    const foundIds = services.map(service => service.id);
    const missingIds = serviceIds.filter(id => !foundIds.includes(id));

    if (missingIds.length > 0) {
      throw new NotFoundException(`Serviço(s) não encontrado(s): ${missingIds.join(', ')}`);
    }
  }


}
