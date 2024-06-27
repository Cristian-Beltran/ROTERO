import { ClassVehicle } from 'src/class-vehicle/class-vehicle.entity';
import { Driver } from 'src/drivers/drivers.entity';
import { Operator } from 'src/operators/operators.entity';
import { Owner } from 'src/owners/owners.entity';
import { Payorder } from 'src/payorders/payorders.entity';
import { Role } from 'src/roles/roles.entity';
import { Rossete } from 'src/rossetes/rossetes.entity';
import { Route } from 'src/routes/routes.entity';
import { Service } from 'src/service/service.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';
export declare enum PermissionLevel {
    SUPERADMINISTRADOR = "SUPERADMINISTRADOR",
    ADMINISTRADOR = "ADMINISTRADOR",
    TECNICO = "TECNICO",
    OPERADOR = "OPERADOR",
    CONSULTOR = "CONSULTOR"
}
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    birthday: Date;
    ci: string;
    email: string;
    password: string;
    permissionLevel: PermissionLevel;
    isActive: boolean;
    cellphone: string;
    lastLogin: Date;
    createdAt: Date;
    updatedAt: Date;
    role: Role;
    rolesUpdate: Role[];
    operatorsUpdate: Operator[];
    payordersUpdate: Payorder[];
    ownersUpdate: Owner[];
    driversUpdate: Driver[];
    vehiclesUpdate: Vehicle[];
    routesUpdate: Route[];
    rossetesUpdate: Rossete[];
    classVehicleUpdate: ClassVehicle[];
    servicesUpdate: Service[];
}
