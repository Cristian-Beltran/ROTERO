import { Operator } from 'src/operators/operators.entity';
import { Payorder } from 'src/payorders/payorders.entity';
import { TypeSantion } from 'src/type-santions/type-santions.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Santion {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  detail: string;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  @ManyToOne(() => User, (user) => user.santionsUpdate, { cascade: false })
  user: User;
  @ManyToOne(() => Operator, (operator) => operator.santions, {
    cascade: false,
  })
  operator: Operator;
  @OneToOne(() => Payorder)
  @JoinColumn()
  payorder: Payorder;
  @OneToOne(() => TypeSantion)
  @JoinColumn()
  typeSantion: TypeSantion;
}
