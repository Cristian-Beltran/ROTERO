import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { User } from 'src/users/users.entity';
import { ServiceType } from './service.dto';
import { DetailPayorder } from 'src/payorders/detail_payorder.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'text' })
  name: string;
  @Column({ type: 'text' })
  detail: string;
  @Column({ default: 0 })
  amount: number;
  @Column()
  type: ServiceType;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  //Relations
  @ManyToOne(() => User, (user) => user.servicesUpdate, { cascade: false })
  user: User;
  @OneToMany(() => DetailPayorder, (detailPayorder) => detailPayorder.service)
  detailPayorders: DetailPayorder[];
}
