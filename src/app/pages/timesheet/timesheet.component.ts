import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { API_Config } from '@core/api/api-config/api.config';
import { AuthService, LanguageService } from '@core/services';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { Timesheet_Columns_AR, Timesheet_Columns_EN } from './timesheet-columns.config';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent {
  _languageService = inject(LanguageService);
  _authService = inject(AuthService);
  router = inject(Router);

  apiUrls = API_Config.timesheet;

  columnsLocalized = {
    en: Timesheet_Columns_EN,
    ar:  Timesheet_Columns_AR,
  };

}
