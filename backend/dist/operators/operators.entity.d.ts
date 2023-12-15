import { User } from 'src/users/users.entity';
import { Payorder } from 'src/payorders/payorders.entity';
export declare enum State {
    AUTORIZADO = "AUTIRIZADO",
    BAJA = "BAJA",
    PROCESO = "PROCESO"
}
export declare class Operator {
    id: number;
    businessName: string;
    legalRepresentative: string;
    owner: string;
    seprec: string;
    nit: string;
    administrativeResolution: string;
    dateRa: Date;
    initialAffiliates: number;
    currentAffiliates: number;
    state: State;
    tecnicalNumber: string;
    legalNumber: string;
    observations: string;
    operatorCertification: string;
    validity: Date;
    route: string;
    createdAt: Date;
    updatedAt: Date;
    operator: User;
    payorders: Payorder[];
    user: User;
}
