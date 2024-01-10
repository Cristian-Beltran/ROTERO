import { User } from 'src/users/users.entity';
export declare class TypePayorder {
    id: number;
    name: string;
    detail: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
