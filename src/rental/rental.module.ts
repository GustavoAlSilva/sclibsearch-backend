import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import { RentalEntity } from './entities/rental.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RentalEntity])],
    controllers: [RentalController],
    providers: [RentalService],
})
export class RentalModule {}
