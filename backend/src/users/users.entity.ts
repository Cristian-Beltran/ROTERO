import { Operator } from 'src/operators/operators.entity';
import { Role } from 'src/roles/roles.entity';
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
  ADMINISTRADOR = 'ADMINISTRADOR',
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
}
