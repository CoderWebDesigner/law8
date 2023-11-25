import { Auth_API } from "./auth";
import { Clients_API } from "./clients";
import { General_API } from "./general";

export const API_Config = {
  ...General_API,
  ...Auth_API,
  ...Clients_API

}
