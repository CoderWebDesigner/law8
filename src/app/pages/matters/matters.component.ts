import { Component, inject } from '@angular/core';
import { AuthService, LanguageService } from '@core/services';
import { TimesheetService } from '@shared/services/timesheet.service';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Matters_Columns_AR, Matters_Columns_EN, Matters_Columns_FR } from './matter-columns.config';

@Component({
  selector: 'app-matters',
  templateUrl: './matters.component.html',
  styleUrls: ['./matters.component.scss']
})
export class MattersComponent {
  _languageService = inject(LanguageService);
  _authService = inject(AuthService);
  _dialogService = inject(DialogService);
  _timeSheetService = inject(TimesheetService);
  _dialogConfig= inject(DynamicDialogConfig)
  data: any[] = [
    {
      Code: '00000-001',
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
      Code: '00000-002',
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
  onRowSelected(e){

    console.log(this._dialogConfig.data)
    if(this._dialogConfig.data['selectRow']){

      this._timeSheetService.selectedMatter$.next(e.data)
      this._dialogService.dialogComponentRefMap.forEach(dialog => {
        dialog.destroy();
      });
    }
  }
}
