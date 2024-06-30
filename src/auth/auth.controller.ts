import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from '../user/entities/user.entity';
import { MessagesHelper } from '../helpers/messages.helper';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: { email: string, password: string }): Promise<UserEntity | string> {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            return MessagesHelper.PASSWORD_OR_EMAIL_INVALID;
        }
        return user;
    }
}
