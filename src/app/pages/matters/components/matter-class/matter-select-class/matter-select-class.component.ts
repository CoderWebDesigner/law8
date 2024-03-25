import { Component, inject } from '@angular/core';
import {
  Matter_Class_Columns_EN,
  Matter_Class_Columns_AR,
  Matter_Class_Columns_FR,
} from '../matter-class-columns.config';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { API_Config } from '@core/api/api-config/api.config';
import { MatterService } from '@shared/services/matter/matter.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { tick } from '@angular/core/testing';
import { ApiService } from '@core/api/api.service';
import { SharedService } from '@shared/services/shared.service';
import { ApiRes } from '@core/models';
import { LanguageService, ToasterService } from '@core/services';

@Component({
  selector: 'app-matter-select-class',
  templateUrl: './matter-select-class.component.html',
  styleUrls: ['./matter-select-class.component.scss'],
})
export class MatterSelectClassComponent {
  _matterService = inject(MatterService);
  _dynamicDialogConfig = inject(DynamicDialogConfig);
  _dialogService = inject(DialogService);
  _apiService = inject(ApiService);
  _sharedService = inject(SharedService);
  _languageService = inject(LanguageService);
  _toastrNotifiService = inject(ToasterService);
  _DialogService = inject(DialogService);
  _dynamicDialogRef = inject(DynamicDialogRef);
  data: any[] = [];
  columnsLocalized = {
    en: Matter_Class_Columns_EN,
    ar: Matter_Class_Columns_AR,
    fr: Matter_Class_Columns_FR,
  };
  apiUrls: any = API_Config.Class;
  apiClassUrls: any = API_Config.matterClass;
  filterOptions?: any = {
    pageNum: 1,
    pagSize: 5,
    orderByDirection: 'ASC',
  };
  onRowSelect(e) {
    this.data.push(e?.data);
    console.log(this.data);
  }
  selectRows() {
    if (this.data.length == 0) return;
    const successMsgKey = 'messages.createdSuccessfully';
    const requestPayload = {
      ...this.data[0],
      law_MatterId: this._dynamicDialogConfig?.data?.law_MatterId,
    };
    console.log(this._dynamicDialogConfig?.data?.isDynamic)
    console.log(requestPayload)
    if (this._dynamicDialogConfig?.data?.isDynamic) {
      this._apiService
        .post(API_Config.matterClass.create, requestPayload)
        .pipe(this._sharedService.takeUntilDistroy())
        .subscribe({
          next: (res: ApiRes) => {
            if (res && res.isSuccess) {
              const text = this._languageService.getTransValue(successMsgKey);
              this._toastrNotifiService.displaySuccessMessage(text);
              this._DialogService.dialogComponentRefMap.forEach((dialog) => {
                this._dynamicDialogRef.close(dialog);
              });
            } else {
              this._toastrNotifiService.displayErrorToastr(res?.message);
            }
          },
          error: (err: any) => {
            this._toastrNotifiService.displayErrorToastr(err?.error?.message);
          },
        });
    } else {
      this._matterService.class$.next(this.data);
      this._dialogService.dialogComponentRefMap.forEach((dialog) => {
        dialog.destroy();
      });
    }
  }
}
