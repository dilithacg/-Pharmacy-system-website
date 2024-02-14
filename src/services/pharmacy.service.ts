import { Injectable } from '@nestjs/common';
import { DataSource, Not } from 'typeorm';
import { CommonService } from './common.service';
import { ApiResponse } from 'src/common/classes/api-response';
import { Pharmacy } from 'src/entities/pharmacy.entity';

@Injectable()
export class PharmacyService extends CommonService {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async create(pharmacy: Pharmacy) {
    const apiResponse = new ApiResponse();
    try {
      const oldEntity = await this.entityManager.findOne(Pharmacy, {
        where: {
          name: pharmacy.name,
        },
      });

      if (oldEntity) {
        apiResponse.error = true;
        apiResponse.message = 'Pharmacy Name Already exist';
        return apiResponse;
      }

      const entity = await this.entityManager.save(Pharmacy, pharmacy);
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
      const entity = await this.entityManager.find(Pharmacy);
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
      const entity = await this.entityManager.findOne(Pharmacy, {
        where: { id: id },
      });
      apiResponse.data = entity;
    } catch (error) {
      apiResponse.error = true;
      apiResponse.message = error.message;
    }
    return apiResponse;
  }

  async update(pharmacy: Pharmacy) {
    const apiResponse = new ApiResponse();
    try {
      const oldEntity = await this.entityManager.findOne(Pharmacy, {
        where: {
          id: Not(pharmacy.id),
          email: pharmacy.name,
        },
      });

      if (oldEntity) {
        apiResponse.error = true;
        apiResponse.message = 'Pharmacy Name Already exist';
        return apiResponse;
      }

      const entity = await this.entityManager.save(Pharmacy, pharmacy);
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
      const entity = await this.entityManager.delete(Pharmacy, id);
      apiResponse.data = entity;
    } catch (error) {
      apiResponse.error = true;
      apiResponse.message = error.message;
    }
    return apiResponse;
  }
}
