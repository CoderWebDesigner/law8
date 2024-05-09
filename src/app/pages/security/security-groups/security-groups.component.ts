import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedSearchInputComponent } from '@shared/components/shared-search-input/shared-search-input.component';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import { SharedModule } from '@shared/shared.module';
import {
  Security_Groups_Columns_EN,
  Security_Groups_Columns_AR,
  Security_Groups_Columns_FR,
} from './security-groups-columns.config';
import { LanguageService, ToasterService } from '@core/services';
import { SecurityGroupsEditorComponent } from './security-groups-editor/security-groups-editor.component';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedService } from '@shared/services/shared.service';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';
import { PickListModule } from 'primeng/picklist';
import { CommonModule } from '@angular/common';
import { API_Config } from '@core/api/api-config/api.config';
import { PAGESIZE } from '@core/utilities/defines';
import { ApiService } from '@core/api/api.service';
import { ApiRes } from '@core/models';
@Component({
  selector: 'app-security-groups',
  templateUrl: './security-groups.component.html',
  styleUrls: ['./security-groups.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedTableComponent,
    SharedSearchInputComponent,
    SharedCardComponent,
    SharedModule,
    PickListModule,
  ],
})
export class SecurityGroupsComponent {
  isSubmit: boolean;
  apiUrls = API_Config.security;
  filterOptions = {
    pageNum: 1,
    pagSize: PAGESIZE,
    orderByDirection: 'ASC',
    lang: 'en',
  };
  source: any[] = [];
  target: any[] = [];
  permissions:any[]=[]
  selectedRow: any;
  _languageService = inject(LanguageService);
  _dialogService = inject(DialogService);
  _sharedService = inject(SharedService);
  _sharedTableService = inject(SharedTableService);
  _apiService = inject(ApiService);
  _toastrNotifiService = inject(ToasterService);
  _changeDetectionRef = inject(ChangeDetectorRef);
  columnsLocalized = {
    en: Security_Groups_Columns_EN,
    ar: Security_Groups_Columns_AR,
    fr: Security_Groups_Columns_FR,
  };

  additionalTableConfig: TableConfig = {
    id: 'id',
    actions: [
      {
        type: 'update',
        title: this._languageService.getTransValue('btn.update'),
        target: SecurityGroupsEditorComponent,
        icon: 'pencil',
        width: '30%',
        permission:'Update_Security_Groups'
      },
      {
        type: 'delete',
        title: this._languageService.getTransValue('btn.delete'),
        icon: 'trash',
        permission:'Delete_Security_Groups'
      },
    ],
  };
  openItemEditor() {
    const ref = this._dialogService.open(SecurityGroupsEditorComponent, {
      width: '30%',
      header: this._languageService.getTransValue('security.addGroup'),
    });
    ref.onClose
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe((result: any) => {
        this._sharedTableService.refreshData.next(true);
      });
  }
  onRowSelect(e: any) {
    console.log(e)
    this.selectedRow = e.data;
    this.getAllPermissions();
  }
  onRowUnSelect(e: any) {
    this.selectedRow = e;
  }
  getAllPermissions() {
    this._apiService
      .get(API_Config.general.getItemLookup)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          this.source = res['result'];
          this.getPermissionsByRoleId();
        },
      });
  }
  getPermissionsByRoleId() {
    this._apiService
      .get(
        `${API_Config.security.getPermissionsByRoleId}?id=${this.selectedRow?.id}`
      )
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          this.permissions=res['result']?.permissions;
          this.target = [...this.permissions];
          this.source = this.source.filter(
            (sourceItem) =>
              !this.target.some((targetItem) => targetItem.id === sourceItem.id)
          );
          console.log(this.source);
          this._changeDetectionRef.detectChanges();
        },
      });
  }
  submit(requestType: string) {
    let model = {
      roleId: this.selectedRow?.id,
      itemIds: this.target.map((obj) => obj.id),
    };
    const successMsgKey =
      requestType == 'update'
        ? 'messages.updateSuccessfully'
        : 'messages.createdSuccessfully';

    const path =
      requestType == 'update'
        ? API_Config.permission.update
        : API_Config.permission.create;
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
