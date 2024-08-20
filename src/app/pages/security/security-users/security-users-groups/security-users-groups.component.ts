import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  Security_Groups_Columns_AR,
  Security_Groups_Columns_EN,
  Security_Groups_Columns_FR,
} from '@components/security/security-groups/security-groups-columns.config';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiService } from '@core/api/api.service';
import { ApiRes } from '@core/models';
import { LanguageService, ToasterService } from '@core/services';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedSearchInputComponent } from '@shared/components/shared-search-input/shared-search-input.component';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import { SharedService } from '@shared/services/shared.service';
import { SharedModule } from '@shared/shared.module';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-security-users-groups',
  templateUrl: './security-users-groups.component.html',
  styleUrls: ['./security-users-groups.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedTableComponent,
    SharedCardComponent,
    SharedSearchInputComponent,
    SharedModule,
  ],
})
export class SecurityUsersGroupsComponent implements OnChanges {
  
  
  @Input() userId: any;
  additionalTableConfig:TableConfig={
    isSearch:true
  }
  _apiService = inject(ApiService);
  _sharedService = inject(SharedService);
  _languageService = inject(LanguageService);
  _toastrNotifiService = inject(ToasterService);
  _cdRef=inject(ChangeDetectorRef)
  permissionApiUrls = API_Config.security;
  userGroups: any[] = [];
  // selectedGroups: any[] = [];
  isUpdate:boolean;
  isArrayChanged:boolean=true;
  groupColumnsLocalized = {
    en: Security_Groups_Columns_EN,
    ar: Security_Groups_Columns_AR,
    fr: Security_Groups_Columns_FR,
  };
  isLoading:boolean;
  ngOnChanges(changes: SimpleChanges): void {
    console.log('userId',this.userId)
    this.getGroupsByUserId()
    this.isArrayChanged=true
  }

  onSelectGroupRow(e: any) {
    this.userGroups.push(e?.data);
    this.isArrayChanged=false
    this._cdRef.detectChanges()

  }
  onRowUnSelected(e) {
    console.log(e);
    this.userGroups = this.userGroups.filter((obj) => obj.id != e?.id);
    this.isArrayChanged=false
    console.log('selectedGroups', this.userGroups);
  }
  getGroupsByUserId() {
    this._apiService
      .get(`${API_Config.userGroup.getById}?userId=${this.userId}`)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          this.userGroups = res['result']; //?.groups;
          // this.selectedGroups=this.userGroups
          this.isUpdate=this.userGroups.length>0
          // this.isArrayChanged=this.userGroups.length>0
        },
      });
  }
  submit(requestType: string) {

    this.isLoading=true
    let model = {
      userId: this.userId,
      itemIds: this.userGroups.map((obj) => obj.id),
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
      .pipe(this._sharedService.takeUntilDistroy(),finalize(()=> this.isLoading=false))
      .subscribe({
        next: (res: ApiRes) => {
          this.isUpdate=true
          let text = this._languageService.getTransValue(successMsgKey);
          this._toastrNotifiService.displaySuccessMessage(text);
        },
      });
  }
}
