import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [

    {
        id: 1,
        label: 'menu.dashboard',
        icon: 'dashboard.svg',
        link:'/dashboard'
    },
    {
        id: 2,
        label: 'menu.clients.title',
        icon: 'client.svg',
        link:'/clients',
        subItems:[
          {
              id: 1,
              label: 'menu.clients.clientIntack',
              link: '/clients/intake',
              parentId: 2
          },
          {
              id: 2,
              label: 'menu.clients.clientAdd',
              link: '/clients/add',
              parentId:2

          },
          {
              id: 3,
              label: 'menu.clients.clientList',
              link: '/clients',
              parentId:2

          }
      ]
    },
    {
        id: 3,
        label: 'menu.timesheet.title',
        icon: 'trace.svg',
        subItems:[
          {
              id: 1,
              label: 'menu.timesheet.title',
              link: '/timesheet',
              parentId: 3
          },
          {
              id: 2,
              label: 'menu.timesheet.timesheetAdd',
              link: '/timesheet/add',
              parentId:3

          }
      ]
    },
    {
        id: 4,
        label: 'menu.matters.title',
        icon: 'judgement.svg',
        subItems:[
          {
              id: 1,
              label: 'menu.matters.matterList',
              link: '/matters',
              parentId: 4
          },
          {
              id: 2,
              label: 'menu.matters.matterAdd',
              link: '/matters/add',
              parentId:4

          }
      ]
    },
    {
        id: 5,
        label: 'menu.taskManagement.title',
        icon: 'activity.svg',
        subItems:[
          {
              id: 1,
              label: 'menu.taskManagement.taskManagementList',
              link: '/task-management',
              parentId: 5
          },
          {
              id: 2,
              label: 'menu.taskManagement.taskManagementAdd',
              link: '/task-management/add',
              parentId:5

          },
          {
              id: 3,
              label: 'menu.taskManagement.calender',
              link: '/task-management/calender',
              parentId:5

          }
      ]
    },



];
