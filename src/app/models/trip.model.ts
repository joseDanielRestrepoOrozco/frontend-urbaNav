import { Bill } from "./bill.model";

export class Trip {
    id?:number;
    date?:string;
    price?:number;
    status?:boolean;
    route_id?:number;
    customer_id?:number;
    driver_id?:number;
    bill?:Bill;
}
