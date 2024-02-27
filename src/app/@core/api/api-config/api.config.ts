import { Auth_API } from "./auth";
import { Clients_API } from "./clients";
import { Dashboard_API } from "./dashboard";
import { General_API } from "./general";
import { Lookups_API } from "./lookups";
import { Timesheet_API } from "./timesheet";
import { Users_API } from "./users";

export const API_Config = {
  ...General_API,
  ...Auth_API,
  ...Clients_API,
  ...Dashboard_API,
  ...Timesheet_API,
  ...Users_API,
  ...Lookups_API

}
