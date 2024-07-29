import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Operator } from 'src/operators/operators.entity';

@Entity()
export class Route {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'text' })
  description: string;
  @Column({ type: 'float' })
  distance: number;
  @Column({ type: 'text' })
  hourEntry: string;
  @Column({ type: 'text' })
  hourExit: string;
  @Column({ type: 'text' })
  dayEntry: string;
  @Column({ type: 'text' })
  dayExit: string;
  @Column({ default: null })
  routeFile: string;
  @Column({ type: 'text' })
  routeArray: string 
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  //Relations
  @OneToOne(() => Operator)
  @JoinColumn()
  operator: Operator;
  @ManyToOne(() => User, (user) => user.routesUpdate, { cascade: false })
  user: User;
}
