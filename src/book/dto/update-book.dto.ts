import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(
    PickType(CreateBookDto, ['status'] as const),
) {}
