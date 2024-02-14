import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base-entity.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class PharmacyPrice extends BaseEntity {
  @ApiProperty()
  @Column()
  pharmacyId: number;

  @ApiProperty()
  @Column()
  itemId: number;

  @ApiProperty()
  @Column()
  price: number;
}
