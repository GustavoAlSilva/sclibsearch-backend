import { IsNotEmpty } from "class-validator";

export class CreateRentalDto {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    bookId: number;

    @IsNotEmpty()
    dueDate: Date;

    returnDate?: Date;

    fineAmount?: number;

    description?: string;
}
