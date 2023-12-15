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

export enum State {
  AUTORIZADO = 'AUTIRIZADO',
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
  @Column({ type: 'integer' })
  initialAffiliates: number;
  @Column({ type: 'integer' })
  currentAffiliates: number;
  @Column()
  state: State;
  @Column()
  tecnicalNumber: string;
  @Column()
  legalNumber: string;
  @Column({ type: 'text' })
  observations: string;
  @Column()
  operatorCertification: string;
  @Column({ type: 'date' })
  validity: Date;
  @Column()
  route: string;

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

  @ManyToOne(() => User, (user) => user.operatorsUpdate, { cascade: false })
  user: User;
}
