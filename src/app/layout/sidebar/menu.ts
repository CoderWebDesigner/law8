import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [

  {
    id: 1,
    label: 'menu.dashboard',
    icon: 'dashboard.svg',
    link: '/dashboard',
    role:'Add_Client'
  },
  {
    id: 2,
    label: 'menu.clients.title',
    icon: 'client.svg',
    role:'client',
    subItems: [
      {
        id: 1,
        label: 'menu.clients.clientIntack',
        link: '/clients/intake',
        parentId: 2,
        role:'Add_Client'
      },
      {
        id: 2,
        label: 'menu.clients.clientAdd',
        link: '/clients/add',
        parentId: 2,
        role:'Add_Client'

      },
      {
        id: 3,
        label: 'menu.clients.clientList',
        link: '/clients',
        parentId: 2,
        role:'Add_Client'
      }
    ]
  },

  {
    id: 3,
    label: 'menu.matters.title',
    icon: 'judgement.svg',
    role:'matters',
    subItems: [
      {
        id: 1,
        label: 'menu.matters.matterList',
        link: '/matters',
        parentId: 3,
        role:'Add_Client'
      },
      {
        id: 2,
        label: 'menu.matters.matterAdd',
        link: '/matters/add',
        parentId: 3,
        role:'Add_Client'

      }
    ]
  },
  {
    id: 4,
    label: 'menu.taskManagement.title',
    icon: 'activity.svg',
    role:'taskManagement',
    subItems: [
      {
        id: 1,
        label: 'menu.taskManagement.taskManagementList',
        link: '/task-management',
        parentId: 4,
        role:'Add_Client'
      },
      {
        id: 2,
        label: 'menu.taskManagement.taskManagementAdd',
        link: '/task-management/add',
        parentId: 4,
        role:'Add_Client'

      },
      {
        id: 3,
        label: 'menu.taskManagement.calender',
        link: '/task-management/calender',
        parentId: 4,
        role:'Add_Client'

      }
    ]
  },
  {
    id: 5,
    label: 'menu.timesheet.title',
    icon: 'trace.svg',
    role:'timesheet',
    subItems: [
      {
        id: 1,
        label: 'menu.timesheet.title',
        link: '/timesheet',
        parentId: 5,
        role:'Add_Client'
      },
      {
        id: 2,
        label: 'menu.timesheet.timesheetAdd',
        link: '/timesheet/add',
        parentId: 5,
        role:'Add_Client'

      }
    ]
  },
  {
    id: 6,
    label: 'menu.users.title',
    icon: 'client.svg',
    role:'users',
    subItems:[
      {
        id: 1,
        label: 'menu.users.usersList',
        link: '/users',
        parentId: 6,
        role:'Add_Client'
      },
      {
        id: 2,
        label: 'menu.users.userAdd',
        link: '/users/add',
        parentId: 6,
        role:'Add_Client'

      },
    ]
  },
  {
    id: 7,
    label: 'menu.lookups.title',
    icon: 'lookups.svg',
    role:'lookups',
    subItems:[
      {
        id: 1,
        label: 'menu.lookups.matterCategory',
        link: '/lookups/matter-category',
        parentId: 7,
        role:'Add_Client'
      },
      {
        id: 2,
        label: 'menu.lookups.mainList',
        link: '/lookups/main-list',
        parentId: 7,
        role:'Add_Client'

      },
      {
        id: 4,
        label: 'menu.lookups.jurisdictions',
        link: '/lookups/jurisdictions',
        parentId: 7,
        role:'Add_Client'

      },
      {
        id: 5,
        label: 'menu.lookups.rateTable',
        link: '/lookups/rate',
        parentId: 7,
        role:'Add_Client'

      },
    ]
  },
  {
    id: 8,
    label: 'menu.security.title',
    icon: 'security.svg',
    link: '/security',
    role:'Add_Client'
  },

];
