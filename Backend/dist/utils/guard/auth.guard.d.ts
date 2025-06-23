import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/modules/Auth/auth.service';
import { Reflector } from '@nestjs/core';
export declare class JwtAuthGuard implements CanActivate {
    private readonly jwtService;
    private readonly authService;
    private readonly reflector;
    constructor(jwtService: JwtService, authService: AuthService, reflector: Reflector);
    private extractTokenFromHeader;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
