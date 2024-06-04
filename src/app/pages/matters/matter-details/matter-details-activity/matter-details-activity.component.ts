import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { LanguageService } from '@core/services';

import { SharedService } from '@shared/services/shared.service';
import { DialogService } from 'primeng/dynamicdialog';
import {
  Activity_Columns_AR,
  Activity_Columns_EN,
  Activity_Columns_FR,
} from './activity-columns.config';
import { MatterDetailsActivityEditorComponent } from './matter-details-activity-editor/matter-details-activity-editor.component';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { MatterService } from '@components/matters/service/matter.service';
import { API_Config } from '@core/api/api-config/api.config';
import { PAGESIZE } from '@core/utilities/defines';

@Component({
  selector: 'app-matter-details-activity',
  templateUrl: './matter-details-activity.component.html',
  styleUrls: ['./matter-details-activity.component.scss'],
})
export class MatterDetailsActivityComponent implements OnInit, OnDestroy {
  @Input() requestId: number;
  @Input() previewOnly:boolean;
  _dialogService = inject(DialogService);
  _languageService = inject(LanguageService);
  _matterService = inject(MatterService);
  _sharedService = inject(SharedService);
  _sharedTableService = inject(SharedTableService);
  columnsLocalized = {
    en: Activity_Columns_EN,
    ar: Activity_Columns_AR,
    fr: Activity_Columns_FR,
  };
  filterOptions:any={
    pageNum: 1,
    pagSize: PAGESIZE,
    orderByDirection: 'ASC',
  }
  apiUrls:any=API_Config.matterActivity;
  additionalTableConfig: TableConfig = {};
  ngOnInit(): void {
    this.additionalTableConfig={
      id: 'id',
      actions: [
        {
          title: this._languageService.getTransValue('btn.update'),
          target: MatterDetailsActivityEditorComponent,
          icon:'pencil',
          isDynamic:this.requestId != undefined,
          width:'70%',
          permission:'Update_Matter_Activities'
        },
        {
          type: 'delete',
          title: this._languageService.getTransValue('btn.delete'),
          icon: 'trash',
          permission:'Delete_Matter_Activities'
        },
      ],
    }
    this.filterOptions={
      ...this.filterOptions,
      matterId:this.requestId
    }
  }
  openDialog() {
    const ref = this._dialogService.open(MatterDetailsActivityEditorComponent, {
      width: '70%',
      header: this._languageService.getTransValue('matters.addActivity'),
      dismissableMask: true,
      data:{
        law_MatterId:this.requestId,
        isDynamic: this.requestId != undefined,
      }
      
    })
    ref.onClose.pipe(this._sharedService.takeUntilDistroy()).subscribe((result: any) => {
      this._sharedTableService.refreshData.next(true);
    });
  }
  ngOnDestroy(): void {
    this._sharedService.destroy()
  }

}
