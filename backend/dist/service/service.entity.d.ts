import { User } from 'src/users/users.entity';
import { ServiceType } from './service.dto';
import { DetailPayorder } from 'src/payorders/detail_payorder.entity';
export declare class Service {
    id: number;
    name: string;
    detail: string;
    amount: number;
    type: ServiceType;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    detailPayorders: DetailPayorder[];
}
