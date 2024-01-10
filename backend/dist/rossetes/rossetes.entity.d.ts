import { User } from 'src/users/users.entity';
import { Route } from 'src/routes/routes.entity';
export declare enum Status {
    BAJA = "BAJA",
    DUPLICADO = "DUPLICADO",
    REIMPRESO = "REIMPRESO",
    REPOSICION = "REPOSICION",
    VIGENTE = "VIGENTE"
}
export declare class Rossete {
    id: number;
    expiration: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
    route: Route;
    user: User;
}
