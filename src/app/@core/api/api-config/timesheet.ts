export const Timesheet_API = {
  "timesheet":{
      "get":"TimeSheet/GetList",
      "getTempTimeSheet":"/GetTempTimeSheet/?empCode=",
      "getClientNameByMatterId":"AppLookup/GetClientNameByMatterIdLookup",
      "getDraftTimeSheet":"TimeSheet/GetListWithoutPag",
      "create":"TimeSheet/SubmitTemps",
      "update":"TimeSheet/Update",
      "delete":"TimeSheet/Delete",
  }

}
