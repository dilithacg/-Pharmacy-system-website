import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BillDto } from 'src/dtos/bill';
import { Pharmacy } from 'src/entities/pharmacy.entity';
import { BillService } from 'src/services/bill.service';
import { PharmacyService } from 'src/services/pharmacy.service';

@Controller('bill')
export class BillController {
  constructor(private readonly entityService: BillService) {}

  @Post()
  create(@Body() billDto: BillDto) {
    return this.entityService.create(billDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entityService.findOne(+id);
  }
}
