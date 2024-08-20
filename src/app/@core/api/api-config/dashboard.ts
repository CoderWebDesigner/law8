export const Dashboard_API = {
  dashboard: {
    get: 'Dashboard/GetBoxesSummary',
    // getClients: 'Dashboard/GetClients',
    // getNewClients:'Dashboard/GetNewClients',
    getMatters: '/GetUserRelMatterList/?id=',
    getActivities: '/GetUserRelActivityList/?id=',
    getSessions: '/GetUserRelActivityList/?id=',
  },
  clientDashboard:{
    get:'Dashboard/GetClients'
  },
  newClientDashboard:{
    get:'Dashboard/GetNewClients'
  },
  newMattersDashboard:{
    get:'Dashboard/GetNewMatterList'
  },
  activeMatterDashboard:{
    get:'Dashboard/GetActiveMatterList'
  },
  closedMattersDashboard:{
    get:'Dashboard/GetClosedMatterList'
  },
  activitiesDashboard:{
    get:'Dashboard/GetActivityList'
  },
  pasthiringSessionList:{
    get:'Dashboard/GetPastHiringSessionList'
  },
  upcomingHearingSessions:{
    get:'Dashboard/GetUpcomingHearingSessionsList'
  },
  importantMatterDashboard:{
    get:'Dashboard/GetImportentMatterList'
  }
};
