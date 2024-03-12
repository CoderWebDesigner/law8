import { Component, inject } from '@angular/core';
import { AuthService, LanguageService } from '@core/services';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { Matters_Columns_AR, Matters_Columns_EN, Matters_Columns_FR } from './matter-columns.config';
import { TimesheetService } from '@shared/services/timesheet.service';
import { DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-matters',
  templateUrl: './matters.component.html',
  styleUrls: ['./matters.component.scss']
})
export class MattersComponent {
    // _dialogConfig= inject(DynamicDialogConfig)
  // _dialogService = inject(DialogService);
  // _timeSheetService = inject(TimesheetService);
  // selectMode:string='single';
  _languageService=inject(LanguageService)
  additionalTableConfig: TableConfig = {
    id: 'id',
    actions: [
      {
        title: this._languageService.getTransValue('matters.matterDetails'),
        targetType: 'path',
        target: '/matters/update/',
        icon:'eye'
      },
    ],
  };

  data:any[]=[
    {
      id: 1,
      Description: 'Description 1',
      Opened: '19/12/2023',
      MatterType: 'Matter Type 1',
      MatterCategory: 'Matter Category 1',
      PracticeArea: 'Practice Area 1',
      ClientName: 'Client 1',
      CourtCaseNo: 'Court Case No 1',
      ParentMatter: 'Parent Matter 1',
      Status: 'Status 1',
    },
    {
      id: 2,
      Description: 'Description 2',
      Opened: '19/12/2023',
      MatterType: 'Matter Type 2',
      MatterCategory: 'Matter Category 2',
      PracticeArea: 'Practice Area 2',
      ClientName: 'Client 2',
      CourtCaseNo: 'Court Case No 2',
      ParentMatter: 'Parent Matter 2',
      Status: 'Status 2',
    },
  ]
  columnsLocalized = {
    en: Matters_Columns_EN,
    fr: Matters_Columns_FR,
    ar: Matters_Columns_AR,
  };

}
