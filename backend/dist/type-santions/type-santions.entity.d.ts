import { TypePayorder } from 'src/type-payorders/type-payorders.entity';
import { User } from 'src/users/users.entity';
export declare enum Severity {
    LEVE = "LEVE",
    GRAVE = "GRAVE",
    MUY_GRAVE = "MUY GRAVE"
}
export declare class TypeSantion {
    id: number;
    detail: string;
    severity: Severity;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    typePayorder: TypePayorder;
}
