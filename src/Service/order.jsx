import { myApiRoot } from "./client";

export const getMyOrders=()=>{
    return myApiRoot.me().orders().get().execute();
}