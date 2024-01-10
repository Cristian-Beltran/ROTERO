import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { User } from 'src/users/users.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  // permissions: Permission[];
  @Column()
  pRoute: boolean;
  @Column()
  pOwner: boolean;
  @Column()
  pOperator: boolean;
  @Column()
  pDriver: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  //Relations
  @OneToMany(() => User, (user) => user.role, { cascade: false })
  users: User[];

  @ManyToOne(() => User, (user) => user.rolesUpdate, { cascade: false })
  user: User;
}
