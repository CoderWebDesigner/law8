
import { Component, Input, OnInit, inject } from '@angular/core';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedSearchInputComponent } from '@shared/components/shared-search-input/shared-search-input.component';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import { SharedModule } from '@shared/shared.module';
import {
  Matters_Columns_AR,
  Matters_Columns_EN,
  Matters_Columns_FR,
} from './matter-columns.config';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { TimesheetService } from '@shared/services/timesheet.service';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiRes } from '@core/models';
import { ApiService } from '@core/api/api.service';
import { SharedService } from '@shared/services/shared.service';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';

@Component({
  selector: 'app-shared-matter-table',
  templateUrl: './shared-matter-table.component.html',
  styleUrls: ['./shared-matter-table.component.scss'],
  standalone: true,
  imports: [
    SharedCardComponent,
    SharedTableComponent,
    SharedSearchInputComponent,
    SharedModule
],
})
export class SharedMatterTableComponent implements OnInit {
  _dialogConfig = inject(DynamicDialogConfig);
  _dialogService = inject(DialogService);
  _timeSheetService = inject(TimesheetService);
  _dynamicDialogRef = inject(DynamicDialogRef);
  _apiService = inject(ApiService);
  _sharedService = inject(SharedService);
  @Input() selectMode: string = 'single';
  @Input() mattersColumnsLocalized: any;
  // @Input() additionalTableConfig: any;
  @Input() apiUrls: any;
  columnsLocalized = {
    en: Matters_Columns_EN,
    fr: Matters_Columns_FR,
    ar: Matters_Columns_AR,
  };
  ngOnInit(): void {
    this.columnsLocalized = {
      ...this.columnsLocalized,
      ...this.mattersColumnsLocalized,
    };
    this.apiUrls = this.apiUrls
      ? this.apiUrls
      : this._dialogConfig.data.apiUrls;
  }

  additionalTableConfig: TableConfig = {
    isSearch:true,
  }
  onRowSelected(e: any) {
    if (this._dialogConfig.data['selectRow']) {
      // this.getRateFromLawyerIdAndMatterId(e?.data)
      this._timeSheetService.selectedMatter$.next(e.data)
      // this._dialogService.dialogComponentRefMap.forEach(dialog => {
      //   this._dynamicDialogRef.close(e.data)
      //   // dialog.destroy();
      // });
    }
  }
}
