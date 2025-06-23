import { AuthService } from './auth.service';
import { LoginRequestDTO, LoginResponseDTO } from './auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(data: LoginRequestDTO): Promise<LoginResponseDTO>;
    logout(id: number): Promise<{
        message: string;
    }>;
}
