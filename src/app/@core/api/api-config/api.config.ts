import { Auth_API } from "./auth";
import { Clients_API } from "./clients";
import { Dashboard_API } from "./dashboard";
import { General_API } from "./general";
import { Timesheet_API } from "./timesheet";

export const API_Config = {
  ...General_API,
  ...Auth_API,
  ...Clients_API,
  ...Dashboard_API,
  ...Timesheet_API

}
