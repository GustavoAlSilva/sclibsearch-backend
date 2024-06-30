import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookEntity } from './entities/book.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BookEntity])],
    controllers: [BookController],
    providers: [BookService],
})
export class BookModule {}
