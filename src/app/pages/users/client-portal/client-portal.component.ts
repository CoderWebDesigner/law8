import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import { SharedModule } from '@shared/shared.module';
import { UserChangePasswordComponent } from '../components/user-change-password/user-change-password.component';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { Client_Portal_Columns_EN, Client_Portal_Columns_FR, Client_Portal_Columns_AR } from './client-portal-columns.config';
import { LanguageService } from '@core/services';
import { DialogService } from 'primeng/dynamicdialog';
import { API_Config } from '@core/api/api-config/api.config';

@Component({
  selector: 'app-client-portal',
  standalone: true,
  imports: [CommonModule,SharedCardComponent,SharedTableComponent,SharedModule],
  templateUrl: './client-portal.component.html',
  styleUrls: ['./client-portal.component.scss']
})
export class ClientPortalComponent {
  _languageService = inject(LanguageService);
  _dialogService = inject(DialogService);
  apiUrls=API_Config.clientPortal;
  filterOptions={
    lang:'en'
  }
  additionalTableConfig: TableConfig = {
    id: 'id',
    isSearch:true,
    actions: [
      {
        title: this._languageService.getTransValue('Update Client Portal'),
        targetType: 'path',
        target: '/users/client-portal/update',
        icon:'pencil',
        permission:'Update_Users'
      },
    ],
  };
  columnsLocalized = {
    en: Client_Portal_Columns_EN,
    fr: Client_Portal_Columns_FR,
    ar:  Client_Portal_Columns_AR,
  };
  openChangePasswordModal(id:string){
    this._dialogService.open(UserChangePasswordComponent,{
      width:'30%',
      dismissableMask: true,
      header:this._languageService.getTransValue('users.changePassword'),
      data:{
        id:id
      }
    })
  }
}