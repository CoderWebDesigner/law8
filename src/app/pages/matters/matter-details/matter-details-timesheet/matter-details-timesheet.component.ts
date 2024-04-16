import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LanguageService } from '@core/services';
import {
  Timesheet_Columns_AR,
  Timesheet_Columns_EN,
  Timesheet_Columns_FR,
} from './timesheet-columns.config';
import { API_Config } from '@core/api/api-config/api.config';
import { PAGESIZE } from '@core/utilities/defines';
import { toCamelCase } from '@core/utilities/defines/functions/toCamelCase';

@Component({
  selector: 'app-matter-details-timesheet',
  templateUrl: './matter-details-timesheet.component.html',
  styleUrls: ['./matter-details-timesheet.component.scss'],
})
export class MatterDetailsTimesheetComponent {
  _languageService = inject(LanguageService);
  _authService = inject(AuthService);
  router = inject(Router);

  @Input() requestId;
  apiUrls = API_Config.matterTimeSheet;
  filterOptions: any = {
    pageNum: 1,
    pagSize: PAGESIZE,
    orderByDirection: 'ASC',
  };
  // apiUrls = API_Config.timesheet;

  columnsLocalized = {
    en: Timesheet_Columns_EN,
    fr: Timesheet_Columns_FR,
    ar: Timesheet_Columns_AR,
  };

  ngOnInit(): void {
    this.filterOptions = {
      ...this.filterOptions,
      matterId: this.requestId,
    };
  }

}
