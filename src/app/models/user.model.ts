import { Role } from "./role.model";

export class User {
    _id?: string;
    name?: string;
    surname?: string;
    phone?: string;
    birthdate?: string;
    email?: string;
    password?: string;

    user_id?: string
    role?: Role;
    vehicle_id?: number
    is_available?: boolean
    contactEmergency?: number
    token?: string;

}
