export const Timesheet_API = {
  "timesheet":{
      "get":"/GetTimeSheetSummaryList/?empCode=",
      "getTempTimeSheet":"/GetTempTimeSheet/?empCode=",
      "getClientNameByMatterId":"AppLookup/GetClientNameByMatterIdLookup",
      "getDraftTimeSheet":"TimeSheet/GetListWithoutPag",
      "create":"TimeSheet/Create",
      "update":"TimeSheet/Update",
      "delete":"TimeSheet/Delete",
  }

}
