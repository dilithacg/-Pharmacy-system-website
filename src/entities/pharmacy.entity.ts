import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base-entity.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Pharmacy extends BaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  address: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  contactNo: number;
}
