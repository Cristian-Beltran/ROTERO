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
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  ci: string;
  @Column()
  cellphone: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  //Relations
  @ManyToOne(() => Operator, (operator) => operator.drivers, {
    cascade: false,
  })
  operator: Operator;

  @ManyToOne(() => User, (user) => user.driversUpdate, { cascade: false })
  user: User;
}
