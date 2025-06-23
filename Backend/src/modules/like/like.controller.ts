import {
  Controller,
  Post,
  Delete,
  Param,
  Get,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LikeService } from './like.service';
import { HttpErrorResponseDTO } from '../user/user.dto';
import { CreateLikeDto } from './like.dto';
import { Roles } from 'src/utils/guard/roles.guard';

@ApiBearerAuth()
@ApiTags('Likes')
@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @Roles('cliente')
  @ApiOperation({ summary: 'Curtir ou remover curtida de um prestador' })
  @ApiResponse({ status: 201, description: 'Like criado ou removido com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  toggle(@Body() dto: CreateLikeDto) {
    return this.likeService.toggle(dto);
  }

  @Get('provider/:providerId')
  @ApiOperation({ summary: 'Listar todos os clientes que deram like em um prestador' })
  @ApiParam({ name: 'providerId', example: 1 })
  @ApiResponse({ status: 200, description: 'Lista de clientes retornada com sucesso.' })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  listClientsWhoLiked(
    @Param('providerId', ParseIntPipe) providerId: number,
  ) {
    return this.likeService.listClientsWhoLiked(providerId);
  }

  @Get('client/:clientId')
  @ApiOperation({ summary: 'Listar todos os prestadores que receberam like de um cliente' })
  @ApiParam({ name: 'clientId', example: 2 })
  @ApiResponse({ status: 200, description: 'Lista de prestadores retornada com sucesso.' })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  listProvidersLikedByClient(
    @Param('clientId', ParseIntPipe) clientId: number,
  ) {
    return this.likeService.listProvidersLikedByClient(clientId);
  }
}