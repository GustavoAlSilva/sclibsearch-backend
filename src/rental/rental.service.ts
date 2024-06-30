import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RentalEntity } from './entities/rental.entity';
import { Repository } from 'typeorm';
import { MessagesHelper } from 'src/helpers/messages.helper';

@Injectable()
export class RentalService {
    constructor(
        @InjectRepository(RentalEntity)
        private readonly rentalRepository: Repository<RentalEntity>,
    ) {}

    create(createRentalDto: CreateRentalDto): Promise<RentalEntity> {
        const rental = this.rentalRepository.create(createRentalDto);
        return this.rentalRepository.save(rental);
    }

    findAll(): Promise<RentalEntity[]> {
        return this.rentalRepository.find({
            select: [
                'id',
                'user',
                'book',
                'dueDate',
                'returnDate',
                'fineAmount',
                'description',
                'createdAt',
            ],
        });
    }

    async findOne(id: number): Promise<RentalEntity> {
        const rental = await this.rentalRepository.findOne({
            where: { id },
            select: [
                'id',
                'user',
                'book',
                'dueDate',
                'returnDate',
                'fineAmount',
                'description',
                'createdAt',
            ],
        });
        if (!rental) {
            throw new NotFoundException(MessagesHelper.RENTAL_NOT_FOUND);
        }
        return rental;
    }

    async update(
        id: number,
        updateRentalDto: UpdateRentalDto,
    ): Promise<RentalEntity> {
        await this.findOne(id);
        await this.rentalRepository.update(id, updateRentalDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        await this.findOne(id);
        await this.rentalRepository.update(id, {
            deletedAt: new Date(),
        });
    }
}
