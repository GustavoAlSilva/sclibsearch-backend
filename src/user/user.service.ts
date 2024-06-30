import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MessagesHelper } from '../helpers/messages.helper';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    create(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

    findAll(): Promise<UserEntity[]> {
        return this.userRepository.find({
            select: [
                'id',
                'firstName',
                'lastName',
                'email',
                'phone',
                'isActive',
            ],
        });
    }

    async findOne(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { id },
            select: [
                'id',
                'firstName',
                'lastName',
                'email',
                'phone',
                'isActive',
            ],
        });
        if (!user) {
            throw new NotFoundException(MessagesHelper.USER_NOT_FOUND);
        }
        return user;
    }

    async findByEmail(email: string): Promise<UserEntity | undefined> {
        return this.userRepository.findOne({ where: { email } });
    }

    async update(
        id: number,
        updateUserDto: UpdateUserDto,
    ): Promise<UserEntity> {
        await this.findOne(id);
        await this.userRepository.update(id, updateUserDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        await this.findOne(id);
        await this.userRepository.update(id, {
            isActive: false,
            deletedAt: new Date(),
        });
    }
}
