import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base-entity.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Item extends BaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  code: string;

  @ApiProperty()
  @Column()
  type: number;

  @ApiProperty()
  @Column()
  unit: string;
}
