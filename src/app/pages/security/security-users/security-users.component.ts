import { Component, inject } from '@angular/core';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedSearchInputComponent } from '@shared/components/shared-search-input/shared-search-input.component';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import { SharedModule } from '@shared/shared.module';
import {
  Security_Groups_Columns_EN,
  Security_Groups_Columns_AR,
  Security_Groups_Columns_FR,
} from '../security-groups/security-groups-columns.config';
import {
  Users_Columns_EN,
  Users_Columns_AR,
  Users_Columns_FR,
} from './users-columns-config';
import { CommonModule } from '@angular/common';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiService } from '@core/api/api.service';
import { SharedService } from '@shared/services/shared.service';
import { ApiRes } from '@core/models';
import { LanguageService, ToasterService } from '@core/services';

@Component({
  selector: 'app-security-users',
  templateUrl: './security-users.component.html',
  styleUrls: ['./security-users.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedTableComponent,
    SharedCardComponent,
    SharedSearchInputComponent,
    SharedModule,
  ],
})
export class SecurityUsersComponent {
  usersApiUrls = API_Config.users;
  permissionApiUrls = API_Config.security;
  _apiService = inject(ApiService);
  _sharedService = inject(SharedService);
  _languageService = inject(LanguageService);
  _toastrNotifiService = inject(ToasterService);
  selectedRow: any;
  isSubmit: boolean;
  groups: any[] = [];
  selectedGroups: any[] = [];
  groupColumnsLocalized = {
    en: Security_Groups_Columns_EN,
    ar: Security_Groups_Columns_AR,
    fr: Security_Groups_Columns_FR,
  };
  columnsLocalized = {
    en: Users_Columns_EN,
    ar: Users_Columns_AR,
    fr: Users_Columns_FR,
  };
  onRowSelect(e: any) {
    console.log(e);
    this.selectedRow = e;
  }
  onSelectGroupRow(e: any) {
    console.log('onSelectGroupRow',e);
    this.selectedGroups = e;
  }

  submitGroups(requestType: string) {
    let model = {
      roleId: this.selectedRow?.id,
      itemIds: this.selectedGroups.map((obj) => obj.id),
    };
    const successMsgKey =
      requestType == 'update'
        ? 'messages.updateSuccessfully'
        : 'messages.createdSuccessfully';

    const path =
      requestType == 'update'
        ? API_Config.userGroup.update
        : API_Config.userGroup.create;
    this._apiService
      .post(path, model)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          let text = this._languageService.getTransValue(successMsgKey);
          this._toastrNotifiService.displaySuccessMessage(text);
        },
      });
  }
}
