import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [

    {
        id: 1,
        label: 'menu.dashboard',
        icon: 'dashboard.svg',

    },
    {
        id: 2,
        label: 'menu.clients.title',
        icon: 'client.svg',
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



];
