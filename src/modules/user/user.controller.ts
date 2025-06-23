import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserRequestDTO,
  UpdateUserRequestDTO,
  UserResponseDTO,
  HttpErrorResponseDTO,
  ProviderWithServicesDTO,
  ServiceIdsDTO,
  UpdateEmailDTO,
  UpdatePasswordDTO,
  UpdateStatusDTO,
  UploadPhotoDTO,
} from './user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { ServiceResponseDTO } from '../services/services.dto';
import { Public } from 'src/utils/guard/public.guard';
import { Roles } from 'src/utils/guard/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @Public()
  @ApiOperation({ summary: 'Criar novo usuário' })
  @ApiBody({ type: CreateUserRequestDTO })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso', type: UserResponseDTO })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  async create(@Body() body: CreateUserRequestDTO) {
    return await this.userService.create(body);
  }

  @Get()
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({ status: 200, type: [UserResponseDTO] })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  async list() {
    return await this.userService.list();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: UserResponseDTO })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  async findById(@Param('id') id: string) {
    return await this.userService.findById(Number(id));
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar usuário por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateUserRequestDTO })
  @ApiResponse({ status: 200, type: UserResponseDTO })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserRequestDTO,
  ) {
    return await this.userService.update(Number(id), body);
  }

  @Patch(':id/photo')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Atualizar foto do usuário' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiBody({ type: UploadPhotoDTO })
  @ApiResponse({ status: 200, description: 'Foto de perfil atualizada com sucesso.' })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  async updatePhoto(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.updatePhoto(id, file);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletar usuário por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso' })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  async delete(@Param('id') id: string) {
    return await this.userService.delete(Number(id));
  }

  @Patch(':id/email')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar e-mail do usuário' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateEmailDTO })
  @ApiResponse({ status: 200, description: 'E-mail atualizado com sucesso' })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  async updateEmail(
    @Param('id', ParseIntPipe) userId: number,
    @Body() dto: UpdateEmailDTO,
  ) {
    return this.userService.updateEmail(userId, dto);
  }

  @Patch(':id/password')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar senha do usuário' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdatePasswordDTO })
  @ApiResponse({ status: 200, description: 'Senha atualizada com sucesso' })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  async updatePassword(
    @Param('id', ParseIntPipe) userId: number,
    @Body() dto: UpdatePasswordDTO,
  ) {
    return this.userService.updatePassword(userId, dto);
  }

  @Patch(':id/status')
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar status do usuário' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateStatusDTO })
  @ApiResponse({ status: 200, description: 'Status atualizado com sucesso' })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  async updateStatus(
    @Param('id', ParseIntPipe) userId: number,
    @Body() data: UpdateStatusDTO,
  ) {
    return this.userService.updateStatus(userId, data);
  }

  @Patch(':id/verification')
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar status de verificação do usuário' })
  @ApiResponse({ status: 200, description: 'Status de verificação atualizado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  async updateVerificationStatus(@Param('id', ParseIntPipe) id: number) {
    return this.userService.updateVerificationStatus(id);
  }

  // ========== Provider Services ==========

  @Patch(':id/provider-role')
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tornar usuário um prestador de serviços' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 201, description: 'Usuário agora é um prestador' })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  async addProviderRole(@Param('id', ParseIntPipe) id: number) {
    await this.userService.addProviderRole(id);
    return { message: 'Usuário agora é um prestador de serviço.' };
  }

  @Delete(':id/provider-role')
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover função de prestador de serviços do usuário' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Função de prestador removida' })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  async removeProviderRole(@Param('id', ParseIntPipe) id: number) {
    await this.userService.removeProviderRole(id);
    return { message: 'Usuário deixou de ser um prestador de serviço.' };
  }

  @Post(':id/services')
  @Roles('prestador')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Adicionar serviços a um prestador de serviço' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 201, description: 'Serviços adicionados com sucesso' })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  async addServices(
    @Param('id', ParseIntPipe) userId: number,
    @Body() body: ServiceIdsDTO,
  ) {
    await this.userService.addServicesToProvider(userId, body.serviceIds);
    return { message: 'Serviços adicionados com sucesso.' };
  }

  @Delete(':id/services')
  @Roles('prestador')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover serviços de um prestador de serviço' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Serviços removidos com sucesso' })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  async removeServices(
    @Param('id', ParseIntPipe) userId: number,
    @Body() body: ServiceIdsDTO,
  ) {
    return this.userService.removeServicesFromProvider(userId, body.serviceIds);
  }

  @Get(':id/services')
  @Roles('prestador')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar serviços de um prestador de serviço' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: [ServiceResponseDTO] })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  async getProviderWithServices(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getServicesByProvider(id);
  }

  @Patch(':providerId/services/:serviceId/primary')
  @Roles('prestador')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Alternar serviço principal do prestador' })
  @ApiParam({ name: 'providerId', type: Number })
  @ApiParam({ name: 'serviceId', type: Number })
  @ApiResponse({ status: 200, description: 'Status de principal alterado com sucesso' })
  @ApiResponse({ description: 'Erro de validação ou não encontrado', type: HttpErrorResponseDTO })
  async setPrimaryFlag(
    @Param('providerId', ParseIntPipe) providerId: number,
    @Param('serviceId', ParseIntPipe) serviceId: number,
  ) {
    return this.userService.setPrimaryFlag(providerId, serviceId);
  }

}