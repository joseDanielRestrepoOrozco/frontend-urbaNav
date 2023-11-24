import { User } from "./user.model";

export class Pqrs {
    _id?:string;
    type?:string;
    description?:string;
    date?:string;
    user?:User;
}
