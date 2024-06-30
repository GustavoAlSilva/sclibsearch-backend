import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    blurb: string;

    @IsNotEmpty()
    genre: string;

    @IsNotEmpty()
    mainAuthor: string;

    @IsNotEmpty()
    publisher: string;

    @IsNotEmpty()
    status: string;
}
