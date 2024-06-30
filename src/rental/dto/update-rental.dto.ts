import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateRentalDto } from './create-rental.dto';

export class UpdateRentalDto extends PartialType(
    PickType(CreateRentalDto, ['returnDate', 'description'] as const),
) {}
