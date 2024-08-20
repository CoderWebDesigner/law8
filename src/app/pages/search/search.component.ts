import { Component, inject, OnInit } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { CardItem } from '@core/models';
import { LanguageService } from '@core/services';
import { count } from 'rxjs';
import {
  Clients_Columns_AR,
  Clients_Columns_EN,
  Clients_Columns_FR,
} from './columns-config/client-columns.config';
import {
  Matters_Columns_AR,
  Matters_Columns_EN,
  Matters_Columns_FR,
} from './columns-config/matter-columns.config';
import {
  Matter_Parties_Columns_AR,
  Matter_Parties_Columns_EN,
  Matter_Parties_Columns_FR,
} from './columns-config/parties-columns.config';
import {
  Applicant_Columns_AR,
  Applicant_Columns_EN,
  Applicant_Columns_FR,
} from './columns-config/applicants-columns.config';
import {
  Task_Management_Columns_AR,
  Task_Management_Columns_EN,
  Task_Management_Columns_FR,
} from './columns-config/task-management-columns.config';
import {
  Timesheet_Columns_AR,
  Timesheet_Columns_EN,
  Timesheet_Columns_FR,
} from './columns-config/timesheet-columns.config';
import {
  Client_Contacts_Columns_AR,
  Client_Contacts_Columns_EN,
  Client_Contacts_Columns_FR,
} from './columns-config/client-contacts-columns.config';
import {
  Matter_Contacts_Columns_EN,
  Matter_Contacts_Columns_AR,
} from './columns-config/matter-contacts-columns.config';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  _languageService = inject(LanguageService);
  selectedRow: any;
  items: CardItem[] = [
    {
      id: 1,
      label: this._languageService.getTransValue('dashboard.clients'),
      key: 'Client',
      apiUrl: API_Config.clientDashboard,
      localize: {
        en: Clients_Columns_EN,
        ar: Clients_Columns_AR,
        fr: Clients_Columns_FR,
      },
      additionalTableConfig: {
        id: 'id',
        isSearch: true,
        actions: [
          {
            title: this._languageService.getTransValue('client.updateClient'),
            targetType: 'path',
            target: '/clients/view/',
            icon: 'eye',
            type: 'update',
            permission: 'View_Client', //detail
          },
        ],
      },
    },
    {
      id: 2,
      label: this._languageService.getTransValue('dashboard.matter'),
      key: 'Matter',
      apiUrl: API_Config.newMattersDashboard,
      localize: {
        en: Matters_Columns_EN,
        ar: Matters_Columns_AR,
        fr: Matters_Columns_FR,
      },
      additionalTableConfig: {
        id: 'id',
        isSearch: true,
        actions: [
          {
            title: this._languageService.getTransValue('matters.matterDetails'),
            targetType: 'path',
            target: '/matters/list/view/',
            icon: 'eye',
            permission: 'View_Matter',
          },
        ],
      },
    },
    {
      id: 3,
      label: this._languageService.getTransValue('dashboard.parties'),
      key: 'Parties',
      apiUrl: API_Config.closedMattersDashboard,
      localize: {
        en: Matter_Parties_Columns_EN,
        ar: Matter_Parties_Columns_AR,
        fr: Matter_Parties_Columns_FR,
      },
      additionalTableConfig: {
        id: 'id',
        isSearch: true,
        actions: [
          {
            title: this._languageService.getTransValue('matters.matterDetails'),
            targetType: 'path',
            target: '/matters/list/view/',
            icon: 'eye',
            permission: 'View_Matter',
          },
        ],
      },
    },
    {
      id: 4,
      label: this._languageService.getTransValue('dashboard.applicants'),
      key: 'Applicants',
      apiUrl: API_Config.importantMatterDashboard,
      localize: {
        en: Applicant_Columns_EN,
        ar: Applicant_Columns_AR,
        fr: Applicant_Columns_FR,
      },
      additionalTableConfig: {
        id: 'id',
        isSearch: true,
        actions: [
          {
            title: this._languageService.getTransValue('matters.matterDetails'),
            targetType: 'path',
            target: '/matters/list/view/',
            icon: 'eye',
            permission: 'View_Matter',
          },
        ],
      },
    },
    {
      id: 5,
      label: this._languageService.getTransValue('dashboard.Hearing sessions'),
      key: 'Hearing sessions',
      apiUrl: API_Config.activitiesDashboard,
      localize: {
        en: Task_Management_Columns_EN,
        ar: Task_Management_Columns_AR,
        fr: Task_Management_Columns_FR,
      },
      additionalTableConfig: {
        id: 'id',
        isSearch: true,
        actions: [
          {
            title: this._languageService.getTransValue(
              'taskManagement.updateTask'
            ),
            type: 'update',
            targetType: 'path',
            target: '/task-management/update/',
            icon: 'pencil',
            permission: 'Update_TaskManagement',
          },
          {
            type: 'delete',
            title: this._languageService.getTransValue('btn.delete'),
            icon: 'trash',
            permission: 'Delete_TaskManagement',
          },
        ],
      },
    },
    {
      id: 6,
      label: this._languageService.getTransValue('dashboard.TimeSheet'),
      key: 'TimeSheet',
      apiUrl: API_Config.pasthiringSessionList,
      localize: {
        en: Timesheet_Columns_EN,
        ar: Timesheet_Columns_AR,
        fr: Timesheet_Columns_FR,
      },
      additionalTableConfig: {
        id: 'id',
        isSearch: true,
        actions: [
          {
            title: this._languageService.getTransValue(
              'taskManagement.updateTask'
            ),
            type: 'update',
            targetType: 'path',
            target: '/task-management/update/',
            icon: 'pencil',
            permission: 'Update_TaskManagement',
          },
          {
            type: 'delete',
            title: this._languageService.getTransValue('btn.delete'),
            icon: 'trash',
            permission: 'Delete_TaskManagement',
          },
        ],
      },
    },
    {
      id: 7,
      label: this._languageService.getTransValue('dashboard.Client Contacts'),
      key: 'Client Contacts',
      apiUrl: API_Config.upcomingHearingSessions,
      localize: {
        en: Client_Contacts_Columns_EN,
        ar: Client_Contacts_Columns_AR,
        fr: Client_Contacts_Columns_FR,
      },
      additionalTableConfig: {
        id: 'id',
        isSearch: true,
        actions: [
          {
            title: this._languageService.getTransValue(
              'taskManagement.updateTask'
            ),
            type: 'update',
            targetType: 'path',
            target: '/task-management/update/',
            icon: 'pencil',
            permission: 'Update_TaskManagement',
          },
          {
            type: 'delete',
            title: this._languageService.getTransValue('btn.delete'),
            icon: 'trash',
            permission: 'Delete_TaskManagement',
          },
        ],
      },
    },
    {
      id: 8,
      label: this._languageService.getTransValue('dashboard.Matter Contacts'),
      key: 'Matter Contacts',
      apiUrl: API_Config.upcomingHearingSessions,
      localize: {
        en: Matter_Contacts_Columns_EN,
        ar: Matter_Contacts_Columns_AR,
        fr: Matter_Contacts_Columns_AR,
      },
      additionalTableConfig: {
        id: 'id',
        isSearch: true,
        actions: [
          {
            title: this._languageService.getTransValue(
              'taskManagement.updateTask'
            ),
            type: 'update',
            targetType: 'path',
            target: '/task-management/update/',
            icon: 'pencil',
            permission: 'Update_TaskManagement',
          },
          {
            type: 'delete',
            title: this._languageService.getTransValue('btn.delete'),
            icon: 'trash',
            permission: 'Delete_TaskManagement',
          },
        ],
      },
    },
  ];
  data: any[] = [];
  ngOnInit(): void {}

  onSearch(event: any) {
    console.log('on search', event);
    this.data = [
      {
        key: 'Client',
        label: 'Client',
        count: 1,
      },
      {
        key: 'Matter',
        label: 'Matter',
        count: 2,
      },
      {
        key: 'Matter Contacts',
        label: 'Matter Contacts',
        count: 3,
      },
      {
        key: 'Client Contacts',
        label: 'Client Contacts',
        count: 4,
      },
      {
        key: 'Parties',
        label: 'Parties',
        count: 5,
      },
      {
        key: 'Applicants',
        label: 'Applicants',
        count: 6,
      },
      {
        key: 'Hearing sessions',
        label: 'Hearing sessions',
        count: 7,
      },
      {
        key: 'TimeSheet',
        label: 'TimeSheet',
        count: 8,
      },
    ];
  }
  setSelectedRow(row: any) {
    this.selectedRow = null;
    setTimeout(() => {
      this.selectedRow = this.items.find((obj) => obj.key == row.key);
      console.log('selectedrow', this.selectedRow);
    }, 0);
  }
}
