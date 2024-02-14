import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SelectBillDto } from 'src/dtos/bill';
import { Order } from 'src/entities/order.entity';
import { OrderService } from 'src/services/order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly entityService: OrderService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@UploadedFile() image: Express.Multer.File, @Body() order: Order) {
    const buffer = image.buffer;
    const base64Image = new Buffer(buffer).toString('base64');
    order.image = base64Image;
    return this.entityService.create(order);
  }

  @Get('my-orders/:userId')
  myOrders(@Param('userId') id: string) {
    return this.entityService.myOrders(+id);
  }

  @Get('disctricts/:districtId')
  districtOrders(@Param('districtId') districtId: string) {
    return this.entityService.districtOrders(+districtId);
  }

  @Get('bills/:orderId')
  billsForOrder(@Param('orderId') orderId: string) {
    return this.entityService.districtOrders(+orderId);
  }

  @Post('select-bill')
  selectBill(@Body() selectBillDto: SelectBillDto) {
    return this.entityService.selectBill(selectBillDto);
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
  @UseInterceptors(FileInterceptor('image'))
  update(@UploadedFile() image: Express.Multer.File, @Body() order: Order) {
    const base64Image = image.buffer.toString('base64');
    order.image = base64Image;
    return this.entityService.update(order);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entityService.remove(+id);
  }
}
