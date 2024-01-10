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
import { Owner } from 'src/owners/owners.entity';
import { Driver } from 'src/drivers/drivers.entity';
import { ClassVehicle } from 'src/class-vehicle/class-vehicle.entity';

export enum TypeService {
  INTERPROVINCIAL = 'interprovincial',
  INTERMUNICIPAL = 'intermunicipal',
}
export enum Modality {
  PASAJERO = 'pasajero',
  CARGA = 'carga',
  PASAJERO_CARGA = 'pasajero y carga',
}
export enum TypeVehicle {
  TAXI = 'taxi',
  TAXI_TRUFI = 'taxi trufi',
  TRUFI_MINIBUS = 'trufi minibus',
}

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  typeService: TypeService;
  @Column()
  modality: Modality;
  @Column()
  maxLoad: number;
  @Column()
  maxPass: number;
  @Column()
  typeVehicle: TypeVehicle;
  @Column()
  model: string;
  @Column()
  brand: string;
  @Column()
  motor: string;
  @Column()
  chassis: string;
  @Column()
  soat: boolean;
  @Column()
  inspection: boolean;
  @Column()
  sure: string;
  @Column()
  plate: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  //Relations
  @ManyToOne(() => Operator, (operator) => operator.vehicles, {
    cascade: false,
  })
  operator: Operator;

  @ManyToOne(() => Owner, (owner) => owner.vehicles, {
    cascade: false,
  })
  owner: Owner;
  @OneToOne(() => Driver)
  @JoinColumn()
  driver: Driver;

  @ManyToOne(() => User, (user) => user.vehiclesUpdate, { cascade: false })
  user: User;
  @ManyToOne(() => ClassVehicle, (classVehicle) => classVehicle.vehicles, {
    cascade: false,
  })
  classVehicle: ClassVehicle;
}
