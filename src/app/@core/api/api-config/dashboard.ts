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
  closedMattersDashboard:{
    get:'Dashboard/GetClosedMatterList'
  },
  pasthiringSessionList:{
    get:'Dashboard/GetPastHiringSessionList'
  },
  upcomingHearingSessions:{
    get:'Dashboard/GetUpcomingHearingSessionsList'
  }
};
