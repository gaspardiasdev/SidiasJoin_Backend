import { IsBoolean, IsDateString, IsInt, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty({ example: 1, description: 'ID do prestador de serviço' })
  @IsInt({ message: 'O ID do prestador deve ser um número inteiro.' })
  providerId: number;

  @ApiProperty({ example: true, description: 'Define se o pagamento foi feito' })
  @IsBoolean({ message: 'O campo "paid" deve ser verdadeiro ou falso.' })
  paid: boolean;

  @ApiPropertyOptional({
    example: 'https://res.cloudinary.com/demo/image/upload/v1/comprovativo.png',
    description: 'URL do comprovativo de pagamento',
  })
  @IsOptional()
  @IsUrl({}, { message: 'A URL do comprovativo é inválida.' })
  proofUrl?: string;

  @ApiPropertyOptional({
    example: '2025-06-21T00:00:00.000Z',
    description: 'Data de início da assinatura',
  })
  @IsOptional()
  @IsDateString({}, { message: 'A data de início deve estar no formato ISO.' })
  startsAt?: string;

  @ApiPropertyOptional({
    example: '2025-12-21T00:00:00.000Z',
    description: 'Data de expiração da assinatura',
  })
  @IsOptional()
  @IsDateString({}, { message: 'A data de expiração deve estar no formato ISO.' })
  expiresAt?: string;
}

export class UpdateSubscriptionDto {
  @ApiPropertyOptional({
    example: true,
    description: 'Atualiza o status de pagamento',
  })
  @IsOptional()
  @IsBoolean({ message: 'O campo "paid" deve ser verdadeiro ou falso.' })
  paid?: boolean;

  @ApiPropertyOptional({
    example: 'https://res.cloudinary.com/demo/image/upload/v1/comprovativo.png',
    description: 'URL atualizada do comprovativo de pagamento',
  })
  @IsOptional()
  @IsUrl({}, { message: 'A URL do comprovativo é inválida.' })
  proofUrl?: string;

  @ApiPropertyOptional({
    example: '2025-06-21T00:00:00.000Z',
    description: 'Data de início da nova assinatura',
  })
  @IsOptional()
  @IsDateString({}, { message: 'A data de início deve estar no formato ISO.' })
  startsAt?: string;

  @ApiPropertyOptional({
    example: '2025-12-21T00:00:00.000Z',
    description: 'Data de expiração da nova assinatura',
  })
  @IsOptional()
  @IsDateString({}, { message: 'A data de expiração deve estar no formato ISO.' })
  expiresAt?: string;
}