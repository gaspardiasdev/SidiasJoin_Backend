import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateAdminActionDto {
  @ApiProperty({ example: 1, description: 'ID do administrador que realizou a ação' })
  @IsInt()
  adminId: number;

  @ApiProperty({ example: 5, description: 'ID do prestador afetado pela ação' })
  @IsInt()
  providerId: number;

  @ApiProperty({ example: 'suspensão', description: 'Tipo de ação realizada' })
  @IsString()
  action: string;

  @ApiProperty({ example: 'Conta suspensa por violação dos termos de uso', required: false })
  @IsOptional()
  @IsString()
  note?: string;
}