import { ApiProperty } from '@nestjs/swagger';
import { Role, Status } from '@prisma/client';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthUserDTO {
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

  @ApiProperty({ example: true })
  verified: boolean;
}

export class LoginRequestDTO {
  @ApiProperty({ example: 'rene@example.com' })
  @IsEmail({}, { message: 'O e-mail deve ser válido.' })
  email: string;

  @ApiProperty({ example: 'securePass123' })
  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  password: string;
}

export class LoginResponseDTO {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT de autenticação',
  })
  token: string;

  @ApiProperty({
    type: () => AuthUserDTO,
    description: 'Dados públicos do usuário autenticado',
  })
  user: AuthUserDTO;
}

