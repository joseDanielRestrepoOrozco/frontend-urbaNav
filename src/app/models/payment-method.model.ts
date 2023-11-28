import { User } from "./user.model";

export class PaymentMethod {
    _id?:string;
    type?:string;
    cardNumber?:string;
    cardCVV?:string;
    expiryDate?:string;
    user?:User;
}
