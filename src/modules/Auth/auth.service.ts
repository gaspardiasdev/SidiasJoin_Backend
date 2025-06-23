import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { AuthUserDTO, LoginRequestDTO, LoginResponseDTO } from './auth.dto';
import { Status } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: NestJwtService,
        private readonly userService: UserService,
    ) { }

    async login(data: LoginRequestDTO): Promise<LoginResponseDTO> {
        const user = await this.userService.findByEmail(data.email);

        if (!user || !(await compare(data.password, user.passwordHash))) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        if (user.status == Status.pendente) {
            throw new BadRequestException('Usuário está inativo');
        }

        if (user.status == Status.suspenso) {
            throw new BadRequestException('Usuário está suspenso');
        }

        await this.userService.update(user.id, {
            lastSeen: new Date(),
            isOnline: true,
        });

        const token = await this.jwtService.signAsync({
            sub: user.id,
            email: user.email,
            role: user.role,
        });

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
                verified: user.verified
            },
        };
    }

    async validate(payload: any) {
        const user = await this.userService.findById(payload.sub);
        if (!user) {
            throw new UnauthorizedException('Usuário não encontrado');
        }
        return {
            id: user.id,
            email: user.email,
            role: user.role,
        };
    }


    async logout(id: number): Promise<{ message: string }> {
        await this.userService.update(id, {
            lastSeen: new Date(),
            isOnline: false,
        });

        return { message: 'Logout realizado com sucesso' };
    }
}