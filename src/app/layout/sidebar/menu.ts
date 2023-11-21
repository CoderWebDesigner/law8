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
              link: '/clients',
              parentId:2

          }
      ]
    },



];
