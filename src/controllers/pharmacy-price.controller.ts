import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PharmacyPrice } from 'src/entities/pharmacy-price.entity';
import { PharmacyPriceService } from 'src/services/pharmacy-price.service';

@Controller('pharmacy-price')
export class PharmacyPriceController {
  constructor(private readonly entityService: PharmacyPriceService) {}

  @Post()
  create(@Body() pharmacyPrice: PharmacyPrice) {
    return this.entityService.create(pharmacyPrice);
  }

  @Get()
  findAll() {
    return this.entityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entityService.findOne(+id);
  }

  @Put()
  update(@Body() pharmacyPrice: PharmacyPrice) {
    return this.entityService.update(pharmacyPrice);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entityService.remove(+id);
  }
}
