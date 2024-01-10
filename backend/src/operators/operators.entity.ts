import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { User } from 'src/users/users.entity';
import { Payorder } from 'src/payorders/payorders.entity';
import { Santion } from 'src/santions/santions.entity';
import { Owner } from 'src/owners/owners.entity';
import { Driver } from 'src/drivers/drivers.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';

export enum State {
  AUTORIZADO = 'AUTORIZADO',
  BAJA = 'BAJA',
  PROCESO = 'PROCESO',
}
@Entity()
export class Operator {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  businessName: string;
  @Column()
  legalRepresentative: string;
  @Column()
  owner: string;
  @Column()
  seprec: string;
  @Column()
  nit: string;
  @Column()
  administrativeResolution: string;
  @Column({ type: 'date' })
  dateRa: Date;
  @Column()
  state: State;
  @Column()
  entityMatris: string;
  @Column()
  color: string;

  // nuevo
  @Column()
  tecnicalNumberUrl: string;
  @Column()
  legalNumberUrl: string;

  @Column()
  tecnicalNumber: string;
  @Column()
  legalNumber: string;

  @Column({ type: 'text' })
  observations: string;
  @Column({ type: 'date' })
  validity: Date;
  @Column({ type: 'text' })
  route: string;

  // Nuevo
  @Column({ type: 'timestamp', nullable: true })
  authorizationDate: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  //Relations
  @OneToOne(() => User)
  @JoinColumn()
  operator: User;
  @OneToMany(() => Payorder, (payorder) => payorder.operator)
  payorders: Payorder[];
  @OneToMany(() => Santion, (santion) => santion.operator)
  santions: Payorder[];
  @OneToMany(() => Owner, (owner) => owner.operator)
  owners: Owner[];
  @OneToMany(() => Vehicle, (vehicle) => vehicle.operator)
  vehicles: Vehicle[];
  @OneToMany(() => Driver, (driver) => driver.operator, { cascade: false })
  drivers: Driver[];

  @ManyToOne(() => User, (user) => user.operatorsUpdate, { cascade: false })
  user: User;
}
