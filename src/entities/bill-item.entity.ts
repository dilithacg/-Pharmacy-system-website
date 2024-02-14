import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base-entity.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class BillItem extends BaseEntity {
  @ApiProperty()
  @Column()
  billId: number;

  @ApiProperty()
  @Column()
  itemId: number;

  @ApiProperty()
  @Column()
  unitPrice: number;

  @ApiProperty()
  @Column()
  quantity: number;
}
