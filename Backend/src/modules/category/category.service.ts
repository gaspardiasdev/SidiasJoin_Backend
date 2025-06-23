import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/databases/connection/prisma.service';
import { CreateCategoryRequestDTO, UpdateCategoryRequestDTO } from './category.dto';

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateCategoryRequestDTO) {
        const nameExists = await this.prisma.category.findUnique({
            where: { name: data.name },
        });
        if (nameExists) {
            throw new BadRequestException('Já existe uma categoria com esse nome.');
        }

        return this.prisma.category.create({ data });
    }

    async list() {
        return this.prisma.category.findMany();
    }

    async findById(id: number) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category) {
            throw new NotFoundException('Categoria não encontrada.');
        }
        return category;
    }

    async update(id: number, data: UpdateCategoryRequestDTO) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category) {
            throw new NotFoundException('Categoria não encontrada.');
        }
        if (data.name && data.name !== category.name) {
            const nameExists = await this.prisma.category.findUnique({
                where: { name: data.name },
            });

            if (nameExists) {
                throw new BadRequestException('Já existe outra categoria com esse nome.');
            }
            return this.prisma.category.update({
                where: { id },
                data,
            });
        }
    }

    async delete(id: number) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category) {
            throw new NotFoundException('Categoria não encontrada.');
        }
        await this.prisma.category.delete({ where: { id } });
        return { message: 'Categoria deletada com sucesso' };
    }
}
