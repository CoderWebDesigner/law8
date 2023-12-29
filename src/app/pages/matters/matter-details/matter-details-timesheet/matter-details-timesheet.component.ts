import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LanguageService } from '@core/services';
import { Timesheet_Columns_AR, Timesheet_Columns_EN, Timesheet_Columns_FR } from './timesheet-columns.config';

@Component({
  selector: 'app-matter-details-timesheet',
  templateUrl: './matter-details-timesheet.component.html',
  styleUrls: ['./matter-details-timesheet.component.scss']
})
export class MatterDetailsTimesheetComponent {
  _languageService = inject(LanguageService);
  _authService = inject(AuthService);
  router = inject(Router);

  // apiUrls = API_Config.timesheet;

  columnsLocalized = {
    en: Timesheet_Columns_EN,
    fr: Timesheet_Columns_FR,
    ar: Timesheet_Columns_AR,
  };

  data: any[] = [
    {
      sheetNumber: 1,
      documentDate: new Date(),
      task: '',
      lawyerInitial: '',
      rate: 0,
      hours: 0,
      totalAmount: 0,
      remarks: '',
      timesheetDescription: ''
    }
  ]
}
