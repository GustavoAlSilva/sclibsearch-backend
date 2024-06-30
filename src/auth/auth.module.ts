import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthPolicies } from './auth.policies';
import { UserModule } from '../user/user.module';

@Module({
    imports: [UserModule],
    providers: [
        AuthService,
        AuthPolicies,
    ],
    controllers: [AuthController],
    })
export class AuthModule {}
