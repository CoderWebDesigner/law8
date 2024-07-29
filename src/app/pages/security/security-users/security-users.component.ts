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
import { SecurityUsersGroupsComponent } from './security-users-groups/security-users-groups.component';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';

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
    SecurityUsersGroupsComponent
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
  userGroups: any[] = [];
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
  additionalTableConfig:TableConfig={
    isSearch:true
  }
  onRowSelect(e: any) {
    this.selectedRow = e['data'];
    // this.getGroupsByUserId()
  }
  onSelectGroupRow(e: any) {
    this.selectedGroups.push(e?.data);
  }
  getGroupsByUserId() {

    this._apiService
      .get(`${API_Config.userGroup.getById}?userId=${this.selectedRow?.id}`)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          this.userGroups = res['result']//?.groups;
        },
      });
  }
  onRowUnSelected(e){
    console.log(e)
   this.selectedGroups = this.selectedGroups.filter(obj=>obj.id!=e?.id)
    console.log('selectedGroups',this.selectedGroups)
  }
  submit(requestType: string) {
  
    let model = {
      userId: this.selectedRow?.id,
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

  // resetSelections() {
  //   this.selectedRow = null;
  //   this.userGroups = [];
  //   this.selectedGroups = [];
  // }

  // onSearch(searchKey: string) {
  //   this.resetSelections();
  // }



}
