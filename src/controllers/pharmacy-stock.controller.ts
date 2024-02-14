import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PharmacyStock } from 'src/entities/pharmacy-stock.entity';
import { PharmacyStockService } from 'src/services/pharmacy-stock.service';

@Controller('pharmacy-stock')
export class PharmacyStockController {
  constructor(private readonly entityService: PharmacyStockService) {}

  @Post()
  create(@Body() pharmacyStock: PharmacyStock) {
    return this.entityService.create(pharmacyStock);
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
  update(@Body() pharmacyStock: PharmacyStock) {
    return this.entityService.update(pharmacyStock);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entityService.remove(+id);
  }
}
