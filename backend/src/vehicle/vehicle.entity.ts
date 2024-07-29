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

export enum TypeService {
  INTERPROVINCIAL = 'interprovincial',
  INTERMUNICIPAL = 'intermunicipal',
  INTERPROVINCIALINTERMUNICIPAL = 'interprovincial/intermunicipal',
}
export enum Modality {
  PASAJERO = 'pasajero',
  CARGA = 'carga',
  PASAJERO_CARGA = 'pasajero y carga',
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
  typeVehicle: string;
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
  plate: string;
  @Column()
  classVehicle: string;

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
  @ManyToOne(() => User, (user) => user.vehiclesUpdate, { cascade: false })
  user: User;
}
