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
import { Operator } from 'src/operators/operators.entity';
import { DetailPayorder } from 'src/payorders/detail_payorder.entity';
import { ServiceType } from 'src/service/service.dto';

@Entity()
export class Payorder {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  reason: string;
  @Column({ type: 'text' })
  detail: string;
  @Column({ type: 'timestamp', default: null })
  cancellationDate: Date;
  @Column({ type: 'boolean', default: false })
  cancellation: boolean;
  @Column({ default: 0 })
  amountExtra: number;
  @Column({ type: 'text' })
  detailExtra: string;
  @Column()
  type: ServiceType;
  @Column({ default: 0 })
  total: number = 0; // Inicializa total en 0

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  //Relations
  @ManyToOne(() => Operator, (operator) => operator.payorders, {
    cascade: false,
  })
  operator: Operator;
  @OneToMany(() => DetailPayorder, (detailPayorder) => detailPayorder.payorder)
  detailPayorders: DetailPayorder[];
  @ManyToOne(() => User, (user) => user.payordersUpdate, { cascade: false })
  user: User;
}
