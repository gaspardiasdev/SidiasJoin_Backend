import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateServiceRequestDTO {
  @ApiProperty({ example: 1 })
  @IsInt({ message: 'O ID da categoria deve ser um número inteiro.' })
  categoryId: number;

  @ApiProperty({ example: 'Corte de cabelo masculino' })
  @IsString({ message: 'O nome deve ser uma string.' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres.' })
  @MaxLength(50, { message: 'O nome pode ter no máximo 50 caracteres.' })
  name: string;

  @ApiPropertyOptional({ example: 'Corte com máquina e tesoura, finalização com navalha.' })
  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string.' })
  description?: string;
}

export class UpdateServiceRequestDTO {
  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt({ message: 'O ID da categoria deve ser um número inteiro.' })
  categoryId?: number;

  @ApiPropertyOptional({ example: 'Corte masculino com degradê' })
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string.' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres.' })
  @MaxLength(50, { message: 'O nome pode ter no máximo 50 caracteres.' })
  name?: string;

  @ApiPropertyOptional({ example: 'Atualizado: Corte completo com degradê e finalização.' })
  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string.' })
  description?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean({ message: 'O campo active deve ser verdadeiro ou falso.' })
  active?: boolean;
}

export class ServiceResponseDTO {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Corte de cabelo masculino' })
  name: string;

  @ApiProperty({ example: 'Corte com máquina e tesoura, finalização com navalha.' })
  description?: string | null;;

  @ApiProperty({ example: true })
  active: boolean;

  @ApiProperty({ example: 1 })
  categoryId: number;

  @ApiProperty({ example: '2025-06-18T12:34:56.000Z' })
  createdAt: Date;
}
