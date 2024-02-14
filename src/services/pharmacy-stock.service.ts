import { Injectable } from '@nestjs/common';
import { DataSource, Not } from 'typeorm';
import { CommonService } from './common.service';
import { ApiResponse } from 'src/common/classes/api-response';
import { PharmacyStock } from 'src/entities/pharmacy-stock.entity';

@Injectable()
export class PharmacyStockService extends CommonService {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async create(pharmacyStock: PharmacyStock) {
    const apiResponse = new ApiResponse();
    try {
      const oldEntity = await this.entityManager.findOne(PharmacyStock, {
        where: {
          pharmacyId: pharmacyStock.pharmacyId,
          itemId: pharmacyStock.itemId,
        },
      });

      if (oldEntity) {
        apiResponse.error = true;
        apiResponse.message = 'Pharmacy/Item combination Already exist';
        return apiResponse;
      }

      const entity = await this.entityManager.save(
        PharmacyStock,
        pharmacyStock,
      );
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
      const entity = await this.entityManager.find(PharmacyStock);
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
      const entity = await this.entityManager.findOne(PharmacyStock, {
        where: { id: id },
      });
      apiResponse.data = entity;
    } catch (error) {
      apiResponse.error = true;
      apiResponse.message = error.message;
    }
    return apiResponse;
  }

  async update(pharmacyStock: PharmacyStock) {
    const apiResponse = new ApiResponse();
    try {
      const oldEntity = await this.entityManager.findOne(PharmacyStock, {
        where: {
          id: Not(pharmacyStock.id),
          pharmacyId: pharmacyStock.pharmacyId,
          itemId: pharmacyStock.itemId,
        },
      });

      if (oldEntity) {
        apiResponse.error = true;
        apiResponse.message = 'Pharmacy/Item combination Already exist';
        return apiResponse;
      }

      const entity = await this.entityManager.save(
        PharmacyStock,
        pharmacyStock,
      );
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
      const entity = await this.entityManager.delete(PharmacyStock, id);
      apiResponse.data = entity;
    } catch (error) {
      apiResponse.error = true;
      apiResponse.message = error.message;
    }
    return apiResponse;
  }
}
