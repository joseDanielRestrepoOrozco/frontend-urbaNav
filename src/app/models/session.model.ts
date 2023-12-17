import { User } from "./user.model";

export class Session {
    _id?:string;
    active?:boolean;
    code?:string;
    user?:User;
  
}
