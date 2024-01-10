import type { User } from "./Roles.interfaces";

export interface ClassVehicle {
    id:          number;
    name:        string;
    description: string;
    createdAt:   Date;
    updatedAt:   Date;
    user:        User;
}