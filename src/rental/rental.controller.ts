import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';

@Controller('rental')
export class RentalController {
    constructor(private readonly rentalService: RentalService) {}

    @Post()
    create(@Body() createRentalDto: CreateRentalDto) {
        return this.rentalService.create(createRentalDto);
    }

    @Get()
    findAll() {
        return this.rentalService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.rentalService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: number,
        @Body() updateRentalDto: UpdateRentalDto,
    ) {
        return this.rentalService.update(id, updateRentalDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: number) {
        await this.rentalService.remove(id);
    }
}
