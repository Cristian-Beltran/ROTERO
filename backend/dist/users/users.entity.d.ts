import { Operator } from 'src/operators/operators.entity';
import { Role } from 'src/roles/roles.entity';
export declare enum PermissionLevel {
    ADMINISTRADOR = "ADMINISTRADOR",
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
}
