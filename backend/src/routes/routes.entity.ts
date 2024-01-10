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
import { Vehicle } from '../vehicle/vehicle.entity';

@Entity()
export class Route {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  startText: string;
  @Column()
  endText: string;
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
  @Column()
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
  @OneToOne(() => Vehicle)
  @JoinColumn()
  vehicle: Vehicle;
  @ManyToOne(() => User, (user) => user.routesUpdate, { cascade: false })
  user: User;
}
