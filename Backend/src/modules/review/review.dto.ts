import { IsInt, IsOptional, IsString, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    example: 12,
    description: 'ID do prestador de serviço que recebeu a avaliação',
  })
  @IsInt()
  providerId: number;

  @ApiProperty({
    example: 5,
    description: 'ID do cliente que fez a avaliação',
  })
  @IsInt()
  clientId: number;

  @ApiProperty({
    example: 4,
    description: 'Nota da avaliação (de 1 a 5)',
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    example: 'Ótimo atendimento, muito profissional!',
    description: 'Comentário opcional do cliente',
    required: false,
  })
  @IsOptional()
  @IsString()
  comment?: string;
}

export class UpdateReviewDto {
  @ApiPropertyOptional({ example: 4, description: 'Nota da avaliação (1 a 5)' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @ApiPropertyOptional({ example: 'Serviço excelente!', description: 'Comentário da avaliação' })
  @IsOptional()
  @IsString()
  comment?: string;
}