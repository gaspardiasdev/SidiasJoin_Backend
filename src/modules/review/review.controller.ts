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
import { ReviewService } from './review.service';
import { CreateReviewDto, UpdateReviewDto } from './review.dto';
import { HttpErrorResponseDTO } from '../user/user.dto';
import { Roles } from 'src/utils/guard/roles.guard';

@ApiBearerAuth()
@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @Roles('cliente')
  @ApiOperation({ summary: 'Criar uma avaliação' })
  @ApiResponse({ status: 201, description: 'Avaliação criada com sucesso.' })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @Get('provider/:providerId')
  @ApiOperation({ summary: 'Listar avaliações de um prestador' })
  @ApiParam({ name: 'providerId', example: 1 })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  listByProvider(@Param('providerId', ParseIntPipe) providerId: number) {
    return this.reviewService.listByProvider(providerId);
  }

  @Get('client/:clientId')
  @ApiOperation({ summary: 'Listar avaliações feitas por um cliente' })
  @ApiParam({ name: 'clientId', example: 2 })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  listByClient(@Param('clientId', ParseIntPipe) clientId: number) {
    return this.reviewService.listByClient(clientId);
  }

  @Get(':providerId/:clientId')
  @ApiOperation({ summary: 'Buscar avaliação única por prestador e cliente' })
  @ApiParam({ name: 'providerId', example: 1 })
  @ApiParam({ name: 'clientId', example: 2 })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  findUnique(
    @Param('providerId', ParseIntPipe) providerId: number,
    @Param('clientId', ParseIntPipe) clientId: number,
  ) {
    return this.reviewService.findUnique(providerId, clientId);
  }

  @Patch(':providerId/:clientId')
  @Roles('cliente')
  @ApiOperation({ summary: 'Atualizar uma avaliação' })
  @ApiParam({ name: 'providerId', example: 1 })
  @ApiParam({ name: 'clientId', example: 2 })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  update(
    @Param('providerId', ParseIntPipe) providerId: number,
    @Param('clientId', ParseIntPipe) clientId: number,
    @Body() dto: UpdateReviewDto,
  ) {
    return this.reviewService.update(providerId, clientId, dto);
  }

  @Delete(':providerId/:clientId')
  @Roles('cliente')
  @ApiOperation({ summary: 'Remover uma avaliação' })
  @ApiParam({ name: 'providerId', example: 1 })
  @ApiParam({ name: 'clientId', example: 2 })
  @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
  delete(
    @Param('providerId', ParseIntPipe) providerId: number,
    @Param('clientId', ParseIntPipe) clientId: number,
  ) {
    return this.reviewService.delete(providerId, clientId);
  }
}