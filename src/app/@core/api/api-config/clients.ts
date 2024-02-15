export const Clients_API = {
  client: {
    get: 'Client/GetList',
    getById: 'Client/GetById?id=',
    create: 'Client/Create',
    update: 'Client/Update',
    createIntake: '/CreateClientIntake',
  },
  clientContact: {
    get: 'Law_ClientContact/GetList',
    getById: 'Law_ClientContact/GetById?id=',
    create: 'Law_ClientContact/Create',
    update: 'Law_ClientContact/Update',
    delete:'Law_ClientContact/Delete'
  },
};
