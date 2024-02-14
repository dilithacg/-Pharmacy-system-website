import { Injectable } from '@nestjs/common';
import { DataSource, Not } from 'typeorm';
import { CommonService } from './common.service';
import { ApiResponse } from 'src/common/classes/api-response';
import { PharmacyPrice } from 'src/entities/pharmacy-price.entity';

@Injectable()
export class PharmacyPriceService extends CommonService {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async create(pharmacyPrice: PharmacyPrice) {
    const apiResponse = new ApiResponse();
    try {
      const oldEntity = await this.entityManager.findOne(PharmacyPrice, {
        where: {
          pharmacyId: pharmacyPrice.pharmacyId,
          itemId: pharmacyPrice.itemId,
        },
      });

      if (oldEntity) {
        apiResponse.error = true;
        apiResponse.message = 'Pharmacy/Item combination Already exist';
        return apiResponse;
      }

      const entity = await this.entityManager.save(
        PharmacyPrice,
        pharmacyPrice,
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
      const entity = await this.entityManager.find(PharmacyPrice);
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
      const entity = await this.entityManager.findOne(PharmacyPrice, {
        where: { id: id },
      });
      apiResponse.data = entity;
    } catch (error) {
      apiResponse.error = true;
      apiResponse.message = error.message;
    }
    return apiResponse;
  }

  async update(pharmacyPrice: PharmacyPrice) {
    const apiResponse = new ApiResponse();
    try {
      const oldEntity = await this.entityManager.findOne(PharmacyPrice, {
        where: {
          id: Not(pharmacyPrice.id),
          pharmacyId: pharmacyPrice.pharmacyId,
          itemId: pharmacyPrice.itemId,
        },
      });

      if (oldEntity) {
        apiResponse.error = true;
        apiResponse.message = 'Pharmacy/Item combination Already exist';
        return apiResponse;
      }

      const entity = await this.entityManager.save(
        PharmacyPrice,
        pharmacyPrice,
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
      const entity = await this.entityManager.delete(PharmacyPrice, id);
      apiResponse.data = entity;
    } catch (error) {
      apiResponse.error = true;
      apiResponse.message = error.message;
    }
    return apiResponse;
  }
}
