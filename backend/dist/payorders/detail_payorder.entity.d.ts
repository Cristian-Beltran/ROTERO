import { Service } from 'src/service/service.entity';
import { Payorder } from 'src/payorders/payorders.entity';
export declare class DetailPayorder {
    id: number;
    count: number;
    createdAt: Date;
    updatedAt: Date;
    service: Service;
    payorder: Payorder;
}
