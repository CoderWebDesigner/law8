import { Auth_API } from "./auth";
import { Clients_API } from "./clients";
import { Dashboard_API } from "./dashboard";
import { General_API } from "./general";
import { Lookups_API } from "./lookups";
import { Permission_API } from "./permission";
import { Security_API } from "./security";
import { Timesheet_API } from "./timesheet";

export const API_Config = {
  ...General_API,
  ...Auth_API,
  ...Clients_API,
  ...Dashboard_API,
  ...Timesheet_API,
  ...Lookups_API,
  ...Security_API,
  ...Permission_API

}
