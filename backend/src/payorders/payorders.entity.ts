import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from 'src/users/users.entity';
import { Operator } from 'src/operators/operators.entity';
import { TypePayorder } from 'src/type-payorders/type-payorders.entity';

@Entity()
export class Payorder {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'text' })
  detail: string;
  @Column({ type: 'timestamp', default: null })
  cancellationDate: Date;
  @Column({ type: 'boolean', default: false })
  cancellation: boolean;

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

  @ManyToOne(() => User, (user) => user.payordersUpdate, { cascade: false })
  user: User;
  @OneToOne(() => TypePayorder)
  @JoinColumn()
  typePayorder: TypePayorder;
}
