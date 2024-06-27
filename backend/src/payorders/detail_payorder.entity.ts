import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import { Service } from 'src/service/service.entity';
import { Payorder } from 'src/payorders/payorders.entity';

@Entity()
export class DetailPayorder {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  count: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  //Relations
  @ManyToOne(() => Service, (service) => service.detailPayorders, {
    cascade: false,
  })
  service: Service;
  @ManyToOne(() => Payorder, (payorder) => payorder.detailPayorders, {
    cascade: false,
  })
  payorder: Payorder;
}
