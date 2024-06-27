import { ClassVehicle } from 'src/class-vehicle/class-vehicle.entity';
import { Driver } from 'src/drivers/drivers.entity';
import { Operator } from 'src/operators/operators.entity';
import { Owner } from 'src/owners/owners.entity';
import { Payorder } from 'src/payorders/payorders.entity';
import { Role } from 'src/roles/roles.entity';
import { Rossete } from 'src/rossetes/rossetes.entity';
import { Route } from 'src/routes/routes.entity';
import { Service } from 'src/service/service.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

export enum PermissionLevel {
  SUPERADMINISTRADOR = 'SUPERADMINISTRADOR',
  ADMINISTRADOR = 'ADMINISTRADOR',
  TECNICO = 'TECNICO',
  OPERADOR = 'OPERADOR',
  CONSULTOR = 'CONSULTOR',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;

  @Column()
  birthday: Date;
  @Column({ unique: true })
  ci: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  // 1: admin, 2: operator, 3: consultor
  @Column()
  permissionLevel: PermissionLevel;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  cellphone: string;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  // Relation
  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
  // Relations
  @OneToMany(() => Role, (role) => role.user)
  rolesUpdate: Role[];
  @OneToMany(() => Operator, (operator) => operator.user)
  operatorsUpdate: Operator[];
  @OneToMany(() => Payorder, (payorder) => payorder.user)
  payordersUpdate: Payorder[];
  @OneToMany(() => Owner, (owner) => owner.user)
  ownersUpdate: Owner[];
  @OneToMany(() => Driver, (driver) => driver.user)
  driversUpdate: Driver[];
  @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
  vehiclesUpdate: Vehicle[];
  @OneToMany(() => Route, (route) => route.user)
  routesUpdate: Route[];
  @OneToMany(() => Rossete, (rossete) => rossete.user)
  rossetesUpdate: Rossete[];
  @OneToMany(() => ClassVehicle, (classVehicle) => classVehicle.user)
  classVehicleUpdate: ClassVehicle[];
  @OneToMany(() => Service, (service) => service.user)
  servicesUpdate: Service[];
}
