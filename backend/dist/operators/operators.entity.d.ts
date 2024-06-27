import { User } from 'src/users/users.entity';
import { Payorder } from 'src/payorders/payorders.entity';
import { Owner } from 'src/owners/owners.entity';
import { Driver } from 'src/drivers/drivers.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';
export declare enum State {
    AUTORIZADO = "AUTORIZADO",
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
    state: State;
    entityMatris: string;
    color: string;
    tecnicalNumberUrl: string;
    legalNumberUrl: string;
    tecnicalNumber: string;
    legalNumber: string;
    observations: string;
    validity: Date;
    route: string;
    authorizationDate: Date;
    createdAt: Date;
    updatedAt: Date;
    operator: User;
    payorders: Payorder[];
    owners: Owner[];
    vehicles: Vehicle[];
    drivers: Driver[];
    user: User;
}
