import { Role, Status } from '@prisma/client';
export declare class AuthUserDTO {
    id: number;
    name: string;
    email: string;
    role: Role;
    status: Status;
    verified: boolean;
}
export declare class LoginRequestDTO {
    email: string;
    password: string;
}
export declare class LoginResponseDTO {
    token: string;
    user: AuthUserDTO;
}
