import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { API_Config } from '@core/api/api-config/api.config';
import { AuthService, LanguageService } from '@core/services';
import { Clients_Columns_AR, Clients_Columns_EN } from './clients-columns.config';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  _languageService = inject(LanguageService);
  _authService = inject(AuthService);
  router = inject(Router);

  apiUrls = API_Config.client;

  columnsLocalized = {
    en: Clients_Columns_EN,
    ar:  Clients_Columns_AR,
  };

  additionalTableConfig: TableConfig = {
    id: 'userId',
    actions: [
      {
        type: 'update',
        title: this._languageService.getTransValue('userManagement.updateUser'),
        targetType: 'path',
        target: '/user-management/update/',
      },
      // {
      //   type: 'delete',
      //   title: this._languageService.getTransValue('btn.delete'),
      // },
    ],
  };
}
