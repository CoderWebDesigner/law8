import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LanguageService } from '@core/services';
import { Users_Columns_AR, Users_Columns_EN, Users_Columns_FR } from './users-columns.config';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { DialogService } from 'primeng/dynamicdialog';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { API_Config } from '@core/api/api-config/api.config';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  _languageService = inject(LanguageService);
  _dialogService = inject(DialogService);
  _authService = inject(AuthService);
  _sharedTableService=inject(SharedTableService)
  router = inject(Router);
  apiUrls=API_Config.users;
  showFilter: boolean;


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

  openChangePasswordModal(userId:string){
    this._dialogService.open(UserChangePasswordComponent,{
      width:'30%',
      dismissableMask: true,
      header:this._languageService.getTransValue('users.changePassword'),
      data:{
        userId:userId
      }
    })
  }
  toggleFilter() {
    this.showFilter = !this.showFilter
  }
  onClose(event: boolean) {
    this.showFilter = event
  }
  onFilter(){
    this._sharedTableService.refreshData.next(true);
  }
}
