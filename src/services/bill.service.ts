import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CommonService } from './common.service';
import { ApiResponse } from 'src/common/classes/api-response';
import { BillDto } from 'src/dtos/bill';
import { Bill } from 'src/entities/bill.entity';
import { BillItem } from 'src/entities/bill-item.entity';
import { Order } from 'src/entities/order.entity';

@Injectable()
export class BillService extends CommonService {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async create(billDto: BillDto) {
    const apiResponse = new ApiResponse();

    try {
      await this.dataSource.transaction(async (transactionalEntityManager) => {
        let bill = new Bill();
        bill.orderId = billDto.orderId;
        bill.selected = false;
        bill.validTillDate = billDto.validTillDate;

        const entity = await transactionalEntityManager.save(Bill, bill);

        for (const item of billDto.items) {
          let billItem = new BillItem();
          billItem.billId = entity.id;
          billItem.itemId = item.itemId;
          billItem.unitPrice = item.unitPrice;
          billItem.quantity = item.quantity;

          await transactionalEntityManager.save(BillItem, billItem);
        }

        apiResponse.data = entity;
      });
    } catch (error) {
      apiResponse.error = true;
      apiResponse.message = error.message;
    }

    return apiResponse;
  }

  async findOne(id: number) {
    const apiResponse = new ApiResponse();

    try {
      await this.dataSource.transaction(async (transactionalEntityManager) => {
        let bill = await transactionalEntityManager.findOne(Bill, {
          where: { id: id },
        });

        let billItems = transactionalEntityManager.find(BillItem, {
          where: { billId: bill.id },
        });

        let order = transactionalEntityManager.find(Order, {
          where: { id: bill.orderId },
        });

        let entity: any = { order, bill, billItems };
        apiResponse.data = entity;
      });
    } catch (error) {
      apiResponse.error = true;
      apiResponse.message = error.message;
    }

    return apiResponse;
  }
}
