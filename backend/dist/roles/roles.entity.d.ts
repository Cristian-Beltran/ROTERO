import { User } from 'src/users/users.entity';
export declare class Role {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    pPersonal: boolean;
    pOwner: boolean;
    createdAt: Date;
    updatedAt: Date;
    users: User[];
    user: User;
}
