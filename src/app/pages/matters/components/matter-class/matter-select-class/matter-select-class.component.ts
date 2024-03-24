import { Component, inject } from '@angular/core';
import { Matter_Class_Columns_EN, Matter_Class_Columns_AR, Matter_Class_Columns_FR } from '../matter-class-columns.config';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { API_Config } from '@core/api/api-config/api.config';
import { MatterService } from '@shared/services/matter/matter.service';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-matter-select-class',
  templateUrl: './matter-select-class.component.html',
  styleUrls: ['./matter-select-class.component.scss']
})
export class MatterSelectClassComponent {

  _matterService = inject(MatterService)
  _dialogService = inject(DialogService)
  data:any[]=[]
  columnsLocalized = {
    en: Matter_Class_Columns_EN,
    ar: Matter_Class_Columns_AR,
    fr: Matter_Class_Columns_FR,
  };
  apiUrls:any=API_Config.matterClass;
  filterOptions?: any = {
    pageNum: 1,
    pagSize: 5,
    orderByDirection: 'ASC',
  }
  onRowSelect(e){
    console.log(e)
    this.data.push(e?.data)
  }
  selectRows(){
    this._matterService.class$.next(this.data)
    this._dialogService.dialogComponentRefMap.forEach((dialog) => {
      dialog.destroy();
    });
  }
}
