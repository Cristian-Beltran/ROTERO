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
import { Vehicle } from 'src/vehicle/vehicle.entity';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  ci: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  //Relations
  @ManyToOne(() => Operator, (operator) => operator.owners, {
    cascade: false,
  })
  operator: Operator;
  @OneToMany(() => Vehicle, (vehicle) => vehicle.owner, { cascade: false })
  vehicles: Vehicle[];

  @ManyToOne(() => User, (user) => user.ownersUpdate, { cascade: false })
  user: User;
}
