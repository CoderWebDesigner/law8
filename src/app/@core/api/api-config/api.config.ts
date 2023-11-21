import { Auth_API } from "./auth";
import { Clients_API } from "./clients";

export const API_Config = {
    ...Auth_API,
    ...Clients_API

}
