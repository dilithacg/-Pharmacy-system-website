import { Injectable } from '@nestjs/common';
import { DataSource, Not } from 'typeorm';
import { CommonService } from './common.service';
import { ApiResponse } from 'src/common/classes/api-response';
import { Item } from 'src/entities/item.entity';
import { ItemList } from 'src/views/item-list.entity';

@Injectable()
export class ItemService extends CommonService {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async create(item: Item) {
    const apiResponse = new ApiResponse();
    try {
      const oldEntity = await this.entityManager.findOne(Item, {
        where: {
          name: item.name,
        },
      });

      if (oldEntity) {
        apiResponse.error = true;
        apiResponse.message = 'Item Name Already exist';
        return apiResponse;
      }

      const entity = await this.entityManager.save(Item, item);
      apiResponse.data = entity;
    } catch (error) {
      apiResponse.error = true;
      apiResponse.message = error.message;
    }

    return apiResponse;
  }

  async findAll() {
    const apiResponse = new ApiResponse();
    try {
      const entity = await this.entityManager.find(Item);
      apiResponse.data = entity;
    } catch (error) {
      apiResponse.error = true;
      apiResponse.message = error.message;
    }
    return apiResponse;
  }

  async pharmacyItems(pharmacyId: number) {
    const apiResponse = new ApiResponse();
    try {
      const entity = await this.entityManager.find(ItemList, {
        where: { stockPharmacyId: pharmacyId, pricePharmacyId: pharmacyId },
      });
      apiResponse.data = entity;
    } catch (error) {
      apiResponse.error = true;
      apiResponse.message = error.message;
    }
    return apiResponse;
  }

  async findOne(id: number) {
    const apiResponse = new ApiResponse();
    try {
      const entity = await this.entityManager.findOne(Item, {
        where: { id: id },
      });
      apiResponse.data = entity;
    } catch (error) {
      apiResponse.error = true;
      apiResponse.message = error.message;
    }
    return apiResponse;
  }

  async update(item: Item) {
    const apiResponse = new ApiResponse();
    try {
      const oldEntity = await this.entityManager.findOne(Item, {
        where: {
          id: Not(item.id),
          name: item.name,
        },
      });

      if (oldEntity) {
        apiResponse.error = true;
        apiResponse.message = 'Item Name Already exist';
        return apiResponse;
      }

      const entity = await this.entityManager.save(Item, item);
      apiResponse.data = entity;
    } catch (error) {
      apiResponse.error = true;
      apiResponse.message = error.message;
    }

    return apiResponse;
  }

  async remove(id: number) {
    const apiResponse = new ApiResponse();
    try {
      const entity = await this.entityManager.delete(Item, id);
      apiResponse.data = entity;
    } catch (error) {
      apiResponse.error = true;
      apiResponse.message = error.message;
    }
    return apiResponse;
  }
}
