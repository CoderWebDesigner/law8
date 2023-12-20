import { Component, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { AuthService, LanguageService } from '@core/services';
import { Matters_Columns_AR, Matters_Columns_EN, Matters_Columns_FR } from './matter-columns.config';
import { DialogService } from 'primeng/dynamicdialog';
import { TimesheetService } from '@shared/services/timesheet.service';

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
  apiUrls = API_Config.timesheet;

  columnsLocalized = {
    en: Matters_Columns_EN,
    fr: Matters_Columns_FR,
    ar: Matters_Columns_AR,
  };
  onRowSelected(e){
    this._timeSheetService.selectedMatter$.next(e.data)
    this._dialogService.dialogComponentRefMap.forEach(dialog => {
      dialog.destroy();
    });
  }
}
