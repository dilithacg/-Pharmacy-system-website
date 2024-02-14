import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base-entity.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Bill extends BaseEntity {
  @ApiProperty()
  @Column()
  orderId: number;

  @ApiProperty()
  @Column({ nullable: true })
  selected: boolean;

  @ApiProperty()
  @Column()
  validTillDate: Date;
}
