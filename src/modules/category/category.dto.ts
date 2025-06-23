import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryRequestDTO {
  @ApiProperty({ example: 'Futebol' })
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @ApiProperty({ example: 'Categoria para eventos de futebol.' })
  @IsString({ message: 'A descrição deve ser uma string.' })
  description?: string;
}

export class UpdateCategoryRequestDTO {
  @ApiPropertyOptional({ example: 'Futsal' })
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string.' })
  name?: string;

  @ApiPropertyOptional({ example: 'Categoria para jogos de futsal.' })
  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string.' })
  description?: string;
}

export class CategoryResponseDTO {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Futebol' })
  name: string;

  @ApiProperty({ example: 'Categoria para eventos de futebol.' })
  description?: string;

  @ApiProperty({ example: '2025-06-18T15:45:00.000Z' })
  createdAt: Date;
}