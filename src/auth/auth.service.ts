import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { AuthPolicies } from './auth.policies';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly authPolicies: AuthPolicies,
    ) {}

    async validateUser(email: string, password: string): Promise<UserEntity | null> {
        const user = await this.userService.findByEmail(email);
        if (this.authPolicies.isValidUser(user, password)) {
            delete user.password;
            return user;
        }
        return null;
    }
}
