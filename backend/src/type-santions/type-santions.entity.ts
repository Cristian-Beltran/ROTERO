import { TypePayorder } from 'src/type-payorders/type-payorders.entity';
import { User } from 'src/users/users.entity';
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

export enum Severity {
  LEVE = 'LEVE',
  GRAVE = 'GRAVE',
  MUY_GRAVE = 'MUY GRAVE',
}

@Entity()
export class TypeSantion {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  detail: string;
  @Column()
  severity: Severity;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  @ManyToOne(() => User, (user) => user.typeSantionsUpdate, { cascade: false })
  user: User;
  @OneToOne(() => TypePayorder)
  @JoinColumn()
  typePayorder: TypePayorder;
}
