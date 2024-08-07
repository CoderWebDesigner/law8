import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { API_Config } from '@core/api/api-config/api.config';
import { AuthService, LanguageService } from '@core/services';
import { Clients_Columns_AR, Clients_Columns_EN, Clients_Columns_FR } from './clients-columns.config';
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
    fr:  Clients_Columns_FR,
  };

  additionalTableConfig: TableConfig = {
    id: 'id',
    isSearch:true,
    actions: [
      {
        title: this._languageService.getTransValue('client.updateClient'),
        targetType: 'path',
        target: '/clients/view/',
        icon:'eye',
        type:'update',
        permission:'View_Client' //detail
      },
 
    ],
  };
  mapData(data){
    // console.log(data)
    return data.map((v)=>({
      ...v,
      balance:0
    }))
  }
}
