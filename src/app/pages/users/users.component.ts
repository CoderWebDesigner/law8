import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LanguageService } from '@core/services';
import { Users_Columns_AR, Users_Columns_EN, Users_Columns_FR } from './users-columns.config';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { DialogService } from 'primeng/dynamicdialog';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  _languageService = inject(LanguageService);
  _dialogService = inject(DialogService);
  _authService = inject(AuthService);
  router = inject(Router);
  data:any[]=[
    {
      id:1,
      "userId": "User Id",
      "portalId": "Portal Id",
      "userName": "User Name",
      "telephone": "Telephone",
      "mobile": "Mobile",
      "email": "Email",
      "locked": "Locked",
      "timesheetDate": "Timesheet Date",
      "activation": true
  }
  ]


  additionalTableConfig: TableConfig = {
    id: 'id',
    actions: [
      {
        title: this._languageService.getTransValue('users.updateUser'),
        targetType: 'path',
        target: '/users/update',
        icon:'pencil'
      },
    ],
  };
  columnsLocalized = {
    en: Users_Columns_EN,
    fr: Users_Columns_FR,
    ar:  Users_Columns_AR,
  };

  openChangePasswordModal(){
    this._dialogService.open(UserChangePasswordComponent,{
      width:'30%',
      dismissableMask: true,
      header:this._languageService.getTransValue('users.changePassword')
    })
  }
}
