import { Role } from "./role.model";

export class User {
    _id?:string;
    name?:string;
    surname?:string;
    phone?:string;
    birthdate?:string;
    email?:string;
    password?:string;
    role?:Role;
    token?:string;

}
