import { JwtService as NestJwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginRequestDTO, LoginResponseDTO } from './auth.dto';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: NestJwtService, userService: UserService);
    login(data: LoginRequestDTO): Promise<LoginResponseDTO>;
    validate(payload: any): Promise<{
        id: number;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    logout(id: number): Promise<{
        message: string;
    }>;
}
