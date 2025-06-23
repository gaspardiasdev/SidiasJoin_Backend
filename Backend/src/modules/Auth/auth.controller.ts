import {
    Controller,
    Post,
    Body,
    UseGuards,
    Req,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDTO, LoginResponseDTO } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { HttpErrorResponseDTO } from '../user/user.dto';
import { Public } from 'src/utils/guard/public.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @Public()
    @ApiOperation({ summary: 'Autentica um usuário e retorna um token JWT' })
    @ApiResponse({ status: 200, description: 'Login realizado com sucesso', type: LoginResponseDTO })
    @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
    async login(
        @Body() data: LoginRequestDTO,
    ): Promise<LoginResponseDTO> {
        return this.authService.login(data);
    }

    @Post('logout/:id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Logout do usuário' })
    @ApiParam({ name: 'id', type: Number, example: 1 })
    @ApiResponse({ description: 'Estrutura dos erros de requisição', type: HttpErrorResponseDTO })
    async logout(@Param('id', ParseIntPipe) id: number) {
        return this.authService.logout(id);
    }

}