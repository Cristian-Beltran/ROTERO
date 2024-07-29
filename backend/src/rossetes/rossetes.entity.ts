import { User } from 'src/users/users.entity';
import { Route } from 'src/routes/routes.entity';
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
import { Vehicle } from 'src/vehicle/vehicle.entity';

export enum Status {
  BAJA = 'BAJA',
  DUPLICADO = 'DUPLICADO',
  REIMPRESO = 'REIMPRESO',
  REPOSICION = 'REPOSICION',
  VIGENTE = 'VIGENTE',
}

@Entity()
export class Rossete {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  expiration: string;
  @Column()
  status: Status;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  @OneToOne(() => Vehicle)
  @JoinColumn()
  vehicle: Vehicle;
  @ManyToOne(() => User, (user) => user.rossetesUpdate, { cascade: false })
  user: User;
}
