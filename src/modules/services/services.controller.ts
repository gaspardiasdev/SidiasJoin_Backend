import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { HttpErrorResponseDTO, ProviderWithServicesDTO } from '../user/user.dto';
import { ServiceResponseDTO, CreateServiceRequestDTO, UpdateServiceRequestDTO } from './services.dto';
import { ServicesService } from './services.service';
import { Roles } from 'src/utils/guard/roles.guard';

@ApiBearerAuth()
@ApiTags('Services')
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServicesService) { }

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Criar um serviço' })
  @ApiResponse({ status: 201, type: ServiceResponseDTO })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  create(@Body() data: CreateServiceRequestDTO) {
    return this.serviceService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Listar serviços (filtrar por categoria e nome)' })
  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiResponse({ status: 200, type: [ServiceResponseDTO] })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  list(
    @Query('categoryId') categoryId?: number,
    @Query('name') name?: string,
  ) {
    return this.serviceService.list(categoryId, name);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar serviço por ID' })
  @ApiResponse({ status: 200, type: ServiceResponseDTO })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.serviceService.findById(id);
  }

  @Put(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Atualizar serviço' })
  @ApiResponse({ status: 200, type: ServiceResponseDTO })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateServiceRequestDTO,
  ) {
    return this.serviceService.update(id, data);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Deletar serviço' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.serviceService.delete(id);
  }

  @Get(':id/providers')
  @ApiOperation({ summary: 'Listar todos os prestadores que oferecem um serviço específico' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: ProviderWithServicesDTO, isArray: true })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  async getProvidersByService(
    @Param('id', ParseIntPipe) serviceId: number,
  ) {
    return this.serviceService.findProvidersByService(serviceId);
  }

}