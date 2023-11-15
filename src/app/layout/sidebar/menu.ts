import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [

    {
        id: 1,
        label: 'menu.dashboard',
        icon: 'fat-org',

    },
    {
        id: 2,
        label: 'menu.clients.title',
        icon: 'fat-bar-chart',
        subItems:[
          {
              id: 1,
              label: 'menu.clients.clientIntack',
              link: '/organizations/list',
              parentId: 2
          },
          {
              id: 2,
              label: 'menu.clients.clientAdd',
              link: '/organizations/add',
              parentId:2

          },
          {
              id: 3,
              label: 'menu.clients.clientList',
              link: '/organizations/add',
              parentId:2

          }
      ]
    },



];
