import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Pharmacy } from 'src/entities/pharmacy.entity';
import { PharmacyService } from 'src/services/pharmacy.service';

@Controller('pharmacy')
export class PharmacyController {
  constructor(private readonly entityService: PharmacyService) {}

  @Post()
  create(@Body() pharmacy: Pharmacy) {
    return this.entityService.create(pharmacy);
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
  update(@Body() pharmacy: Pharmacy) {
    return this.entityService.update(pharmacy);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entityService.remove(+id);
  }
}
