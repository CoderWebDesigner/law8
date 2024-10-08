import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AuthService, LanguageService } from '@core/services';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import {
  Matters_Columns_AR,
  Matters_Columns_EN,
  Matters_Columns_FR,
} from './matter-columns.config';
import { TimesheetService } from '@shared/services/timesheet.service';
import { DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { API_Config } from '@core/api/api-config/api.config';
import { PAGESIZE } from '@core/utilities/defines';
import { ApiService } from '@core/api/api.service';
import { SharedService } from '@shared/services/shared.service';
import { ApiRes } from '@core/models';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';

@Component({
  selector: 'app-matters',
  templateUrl: './matters.component.html',
  styleUrls: ['./matters.component.scss'],
})
export class MattersComponent {
  apiUrls = API_Config.matters;
  _languageService = inject(LanguageService);
  _apiService = inject(ApiService);
  _sharedService = inject(SharedService);
  _sharedTableService = inject(SharedTableService);
  _cdRef=inject(ChangeDetectorRef)
  additionalTableConfig: TableConfig = {
    id: 'id',
    isSearch:true,
    actions: [
      {
        title: this._languageService.getTransValue('matters.matterDetails'),
        targetType: 'path',
        target: '/matters/list/view/',
        icon: 'eye',
        permission:'View_Matter'
      },
    ],
  };
  columnsLocalized = {
    en: Matters_Columns_EN,
    fr: Matters_Columns_FR,
    ar: Matters_Columns_AR,
  };
  filterOptions: any = {
    pageNum: 1,
    pagSize: PAGESIZE,
    orderByDirection: 'ASC',
    orderBy:'mtrNo',
    lang:'en'
  };
  toggleFavourite(rowData: any) {
    let payload = {
      matterId: rowData.id
    };
  
    this._apiService.post(API_Config.matters.importentMatter, null, payload).pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next: (res: ApiRes) => {
        if (res && res.isSuccess) {
          // عكس قيمة isImportent عند نجاح الطلب
          rowData.isImportent = !rowData.isImportent;
        }
      }
    });
  }
  

  // toggleFavourite(rowId:number,btnTemplate:any,value:any){
  //   let payload={
  //     matterId:rowId
  //   }
  //   btnTemplate.isFavourie=value
  //   console.log('before btnTemplate.isFavourie',btnTemplate.isFavourie)
  //   this._apiService.post(API_Config.matters.importentMatter,null,payload).pipe(
  //     this._sharedService.takeUntilDistroy()
  //   ).subscribe({
  //     next:(res:ApiRes)=>{
  //       if(res&&res.isSuccess){
  //         // this._sharedTableService.refreshData.next(true)
  //         btnTemplate.isFavourie=!btnTemplate.isFavourie;
  //         this._cdRef.detectChanges()
  //         console.log('after btnTemplate.isFavourie',btnTemplate.isFavourie)
  //       }
  //     }
  //   })
    
  // }
}
