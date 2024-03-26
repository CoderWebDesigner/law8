import { Component, OnInit, inject } from '@angular/core';
import {
  Matter_Class_Columns_EN,
  Matter_Class_Columns_AR,
  Matter_Class_Columns_FR,
} from '../matter-class-columns.config';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { API_Config } from '@core/api/api-config/api.config';

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
import { MatterService } from '@components/matters/service/matter.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-matter-select-class',
  templateUrl: './matter-select-class.component.html',
  styleUrls: ['./matter-select-class.component.scss'],
})
export class MatterSelectClassComponent implements OnInit {
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
  selected: any[] = [];
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
  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this._matterService.classList$
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: any[]) => {
          this.data = res;
          this.selected=[...res]

          console.log('this.data',this.data)

          
        },
      });
  }
  onRowSelect(e) {
    console.log(e);
    // this.selected=[...this.selected,...this.data]
    this.selected.push({
      ...e?.data,
      law_MatterId: (this._dynamicDialogConfig?.data?.law_MatterId)?this._dynamicDialogConfig?.data?.law_MatterId:null,
    });
    
    console.log('onRowSelect',this.selected);
  }
  onRowUnSelect(e){
    // this.selected=this.data
    console.log('onRowUnSelect',e)
    this.selected=this.selected.filter(obj=>obj.classNo!=e.classNo)
    console.log('onRowUnSelect',this.selected)
  }
  save() {
    this.data=this.selected
    console.log('save',this.data)
    const successMsgKey = 'messages.createdSuccessfully';
    const requestPayload = {
      law_MatterClassCreateList: this.data,
    };
    this._apiService
      .post(API_Config.matterClass.create, requestPayload)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          if (res && res.isSuccess) {
            console.log('law_MatterClassCreateList',res.result['law_MatterClassCreateList'])
            this._matterService.classList$.next(res.result['law_MatterClassCreateList']);
            this._matterService.classList$.subscribe({
              next:res=>{
                console.log('subscribe',res)
              }
            })
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
  }
  selectRows() {
    if (this.selected.length == 0) return;

    if (this._dynamicDialogConfig?.data?.isDynamic) {
      this.save();
    } else {
      // this.data=[...this.selected]
      this.data=this.selected
      console.log('selectRows',this.data)
      this._matterService.classList$.next(this.data);
      this._dialogService.dialogComponentRefMap.forEach((dialog) => {
        dialog.destroy();
      });
    }
  }
}
