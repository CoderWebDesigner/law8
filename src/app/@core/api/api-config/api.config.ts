import { Auth_API } from "./auth";
import { Calendar_Security_API } from "./security/calendar-security";
import { Clients_API } from "./clients";
import { Dashboard_API } from "./dashboard";
import { General_API } from "./general";
import { Lookups_API } from "./lookups";
import { Permission_API } from "./security/permission";
import { Security_API } from "./security/security";
import { Timesheet_API } from "./timesheet";
import { Timesheet_Security_API } from "./security/timesheet-security";
import { User_Group_API } from "./security/userGroup";
import { Users_API } from "./users";
import { Matter_Client_Security_API } from "./security/matter-client-security";
import { Reponsable_Lawyer_Security_API } from "./security/reponsable-lawyer-security";
import { Matter_Jurisdiction_Security_API } from "./security/matter-jurisdiction-security";
import { Matter_Include_Security_API } from "./security/matter-include-security";
import { Matter_Exclude_Security_API } from "./security/matter-exclude-security";
import { Matters_API } from "./matters";
import { Matters_Contact_API } from "./matter-contact";
import { Matters_Address_API } from "./matter-address";
import { Matters_Parties_API } from "./matter-parties";

export const API_Config = {
  ...General_API,
  ...Auth_API,
  ...Clients_API,
  ...Dashboard_API,
  ...Timesheet_API,
  ...Security_API,
  ...Permission_API,
  ...Users_API,
  ...User_Group_API,
  ...Timesheet_Security_API,
  ...Calendar_Security_API,
  ...Matter_Client_Security_API,
  ...Reponsable_Lawyer_Security_API,
  ...Matter_Jurisdiction_Security_API,
  ...Matter_Include_Security_API,
  ...Matter_Exclude_Security_API,
  ...Matters_API,
  ...Matters_Contact_API,
  ...Matters_Address_API,
  ...Matters_Parties_API,
  ...Lookups_API

}
