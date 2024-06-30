import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';
import { MessagesHelper } from 'src/helpers/messages.helper';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>,
    ) {}

    create(createBookDto: CreateBookDto): Promise<BookEntity> {
        const book = this.bookRepository.create(createBookDto);
        return this.bookRepository.save(book);
    }

    findAll(): Promise<BookEntity[]> {
        return this.bookRepository.find({
            select: [
                'id',
                'title',
                'blurb',
                'genre',
                'mainAuthor',
                'publisher',
                'status',
            ],
        });
    }

    async findOne(id: number): Promise<BookEntity> {
        const book = await this.bookRepository.findOne({
            where: { id },
            select: [
                'id',
                'title',
                'blurb',
                'genre',
                'mainAuthor',
                'publisher',
                'status',
            ],
        });
        if (!book) {
            throw new NotFoundException(MessagesHelper.BOOK_NOT_FOUND);
        }
        return book;
    }

    async update(
        id: number,
        updateBookDto: UpdateBookDto,
    ): Promise<BookEntity> {
        await this.findOne(id);
        await this.bookRepository.update(id, updateBookDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        await this.findOne(id);
        await this.bookRepository.update(id, {
            status: 'deleted',
            deletedAt: new Date(),
        });
    }
}
