import { User } from "./user.model";

export class Pqrs {
    _id:number;
    type:string;
    description:string;
    date:string;
    user:User;
}
