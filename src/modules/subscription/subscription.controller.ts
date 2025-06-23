import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from './subscription.dto';
import { HttpErrorResponseDTO } from '../user/user.dto';
import { Roles } from 'src/utils/guard/roles.guard';

@ApiBearerAuth()
@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  @Roles('prestador')
  @ApiOperation({ summary: 'Criar uma assinatura para um prestador' })
  @ApiResponse({ status: 201, description: 'Assinatura criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Prestador já possui uma assinatura.' })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  create(@Body() dto: CreateSubscriptionDto) {
    return this.subscriptionService.create(dto);
  }

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Listar todas as assinaturas' })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  findAll() {
    return this.subscriptionService.findAll();
  }

  @Get(':providerId')
  @Roles('prestador')
  @ApiOperation({ summary: 'Buscar assinatura de um prestador' })
  @ApiParam({ name: 'providerId', example: 1 })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  findByProviderId(@Param('providerId', ParseIntPipe) providerId: number) {
    return this.subscriptionService.findByProviderId(providerId);
  }

  @Patch(':providerId')
  @Roles('admin')
  @ApiOperation({ summary: 'Atualizar assinatura de um prestador' })
  @ApiParam({ name: 'providerId', example: 1 })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  update(
    @Param('providerId', ParseIntPipe) providerId: number,
    @Body() dto: UpdateSubscriptionDto,
  ) {
    return this.subscriptionService.update(providerId, dto);
  }

  @Delete(':providerId')
  @Roles('admin')
  @ApiOperation({ summary: 'Remover assinatura de um prestador' })
  @ApiParam({ name: 'providerId', example: 1 })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  delete(@Param('providerId', ParseIntPipe) providerId: number) {
    return this.subscriptionService.delete(providerId);
  }
}