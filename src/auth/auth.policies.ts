import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthPolicies {

	isValidUser(user: UserEntity | undefined, password: string): Boolean {
		if (user && user.password === password && user.isActive && !user.deletedAt) {
            return true;
        }
        return false;
	}
}
