export const Timesheet_API = {
  "timesheet":{
      // "get":"TimeSheet/GetList",
      "get":"TimeSheet/GetListForMatterById",
      "getTempTimeSheet":"/GetTempTimeSheet/?empCode=",
      "getClientNameByMatterId":"AppLookup/GetClientNameByMatterIdLookup",
      "getRateFromLawyerIdAndMatterId":"AppLookup/GetClientNameAndRateByMatterId",
      "getDraftTimeSheet":"TimeSheet/GetListWithoutPag",
      "create":"TimeSheet/SubmitTemps",
      "update":"TimeSheet/Update",
      "delete":"TimeSheet/Delete",
  }

}
