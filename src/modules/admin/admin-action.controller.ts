import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AdminActionService } from './admin-action.service';
import { HttpErrorResponseDTO } from '../user/user.dto';
import { Roles } from 'src/utils/guard/roles.guard';

@ApiBearerAuth()
@Roles('admin')
@ApiTags('Admin Actions')
@Controller('admin-actions')
export class AdminActionController {
  constructor(private readonly adminActionService: AdminActionService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os logs de ações administrativas' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso.' })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  listAll() {
    return this.adminActionService.listAllLogs();
  }

  @Get('admin/:adminId')
  @ApiOperation({ summary: 'Listar ações feitas por um administrador' })
  @ApiParam({ name: 'adminId', example: 1 })
  @ApiResponse({ status: 200, description: 'Ações do admin retornadas com sucesso.' })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  listByAdmin(@Param('adminId', ParseIntPipe) adminId: number) {
    return this.adminActionService.listByAdmin(adminId);
  }

  @Get('provider/:providerId')
  @ApiOperation({ summary: 'Listar ações administrativas sobre um prestador' })
  @ApiParam({ name: 'providerId', example: 10 })
  @ApiResponse({ status: 200, description: 'Ações sobre o prestador retornadas com sucesso.' })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  listByProvider(@Param('providerId', ParseIntPipe) providerId: number) {
    return this.adminActionService.listByProvider(providerId);
  }
}