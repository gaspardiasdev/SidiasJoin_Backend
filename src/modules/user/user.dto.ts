import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role, Status } from '@prisma/client';
import { IsString, IsEmail, MinLength, IsOptional, IsUrl, IsEnum, IsBoolean, IsDate, IsNumber, Matches, ArrayNotEmpty, IsArray, IsInt, IsIn, IsNotEmpty } from 'class-validator';
import { ServiceResponseDTO } from '../services/services.dto';

export class CreateUserRequestDTO {
  @ApiProperty({ example: 'René Kemalandua' })
  @IsString({ message: 'O nome deve ser uma string.' })
  name: string;

  @ApiProperty({ example: 'rene@example.com' })
  @IsEmail({}, { message: 'O e-mail deve ser válido.' })
  email: string;

  @ApiProperty({ example: 'securePass123' })
  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  password: string;

  @ApiPropertyOptional({ example: '923456789' })
  @IsOptional()
  @IsString({ message: 'O telefone deve ser uma string.' })
  @Matches(/^(9[1-5]|9[7-9])\d{7}$/, {
    message: 'O telefone não é Válido.',
  })
  phone?: string;

  @ApiPropertyOptional({ example: 'Luanda, Angola' })
  @IsOptional()
  @IsString({ message: 'A localização deve ser uma string.' })
  location?: string;

  @ApiPropertyOptional({
    example: 'https://res.cloudinary.com/demo/image/upload/v1/user.png',
  })
  @IsOptional()
  @IsUrl({}, { message: 'A URL da imagem deve ser válida.' })
  imageUrl?: string;

  @ApiPropertyOptional({
    enum: Role,
    default: Role.cliente,
    example: Role.cliente,
  })
  @IsOptional()
  @IsEnum(Role, { message: 'O papel informado é inválido.' })
  role?: Role;
}

export class UpdateUserRequestDTO {
  @ApiPropertyOptional({ example: 'René Atualizado' })
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string.' })
  name?: string;

  @ApiPropertyOptional({ example: '923456780' })
  @IsOptional()
  @IsString({ message: 'O telefone deve ser uma string.' })
  @Matches(/^(9[1-5]|9[7-9])\d{7}$/, {
    message: 'O telefone não é Válido.',
  })
  phone?: string;

  @ApiPropertyOptional({ example: 'Benguela, Angola' })
  @IsOptional()
  @IsString({ message: 'A localização deve ser uma string.' })
  location?: string;

  @ApiPropertyOptional({
    example: 'Desenvolvedor fullstack apaixonado por IA.',
  })
  @IsOptional()
  @IsString({ message: 'O campo "about" deve ser uma string.' })
  about?: string;

  @ApiPropertyOptional({ example: -8.838333 })
  @IsOptional()
  @IsNumber({}, { message: 'A latitude deve ser um número.' })
  lat?: number;

  @ApiPropertyOptional({ example: 13.234444 })
  @IsOptional()
  @IsNumber({}, { message: 'A longitude deve ser um número.' })
  lng?: number;

  @ApiPropertyOptional({ enum: Status, example: Status.ativo })
  @IsOptional()
  @IsEnum(Status, { message: 'O status informado é inválido.' })
  status?: Status;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean({ message: 'O campo "verified" deve ser verdadeiro ou falso.' })
  verified?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean({ message: 'O campo "isOnline" deve ser verdadeiro ou falso.' })
  isOnline?: boolean;

  @ApiPropertyOptional({ example: '2025-06-18T12:34:56.000Z' })
  @IsOptional()
  @IsDate({ message: 'A data de "lastSeen" deve ser uma data válida.' })
  lastSeen?: Date;
}

export class UploadPhotoDTO {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'A nova foto do usuário',
    example: 'https://res.cloudinary.com/demo/image/upload/v1/new_photo.png',
  })
  @IsNotEmpty({ message: 'A imagem é obrigatória' })
  file: any;
}

export class UserResponseDTO {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'René Manuel' })
  name: string;

  @ApiProperty({ example: 'rene@example.com' })
  email: string;

  @ApiProperty({ enum: Role, example: Role.cliente })
  role: Role;

  @ApiProperty({ enum: Status, example: Status.ativo })
  status: Status;

  @ApiPropertyOptional({ example: '+244923456789' })
  phone?: string;

  @ApiPropertyOptional({ example: 'Luanda, Angola' })
  location?: string;

  @ApiPropertyOptional({
    example: 'https://res.cloudinary.com/demo/image/upload/v1/user.png',
  })
  imageUrl?: string;

  @ApiPropertyOptional({
    example: 'Desenvolvedor fullstack apaixonado por IA.',
  })
  about?: string;

  @ApiPropertyOptional({ example: -8.838333 })
  lat?: number;

  @ApiPropertyOptional({ example: 13.234444 })
  lng?: number;

  @ApiProperty({ example: true })
  verified: boolean;

  @ApiProperty({ example: false })
  isOnline: boolean;

  @ApiProperty({ example: '2025-06-18T12:34:56.000Z' })
  lastSeen?: Date;

  @ApiProperty({ example: '2025-06-18T12:34:56.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-06-18T13:00:00.000Z' })
  updatedAt: Date;
}

export class UpdateEmailDTO {
  @IsEmail({}, { message: 'O e-mail deve ser válido.' })
  @ApiProperty({ example: 'novo@email.com' })
  email: string;
}

export class UpdatePasswordDTO {
  @ApiProperty({ example: 'senhaAtual123' })
  @MinLength(6)
  currentPassword: string;

  @ApiProperty({ example: 'novaSenha456' })
  @MinLength(6)
  newPassword: string;
}

export class UpdateStatusDTO {
  @ApiProperty({ enum: ['pendente', 'ativo', 'suspenso'] })
  @IsIn(['pendente', 'ativo', 'suspenso'])
  status: 'pendente' | 'ativo' | 'suspenso';
}

export class ServiceIdsDTO {
  @ApiProperty({ type: [Number], example: [1, 2, 3] })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  serviceIds: number[];
}

export class ProviderWithServicesDTO {
  @ApiProperty({ type: () => UserResponseDTO })
  provider: UserResponseDTO;

  @ApiProperty({ type: () => [ServiceResponseDTO] })
  services: ServiceResponseDTO[];
}

export class HttpErrorResponseDTO {
  @ApiProperty({ example: 'string || string[]' })
  message: string;

  @ApiProperty({ example: 'string' })
  error: string;

  @ApiProperty({ example: "number" })
  statusCode: number;
}

