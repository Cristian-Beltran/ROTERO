import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import { User } from 'src/users/users.entity';
import { Operator } from 'src/operators/operators.entity';

@Entity()
export class Payorder {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  count: number;
  @Column({ type: 'text' })
  detail: string;
  @Column({ type: 'date' })
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

  @ManyToOne(() => User, (user) => user.rolesUpdate, { cascade: false })
  user: User;
}
