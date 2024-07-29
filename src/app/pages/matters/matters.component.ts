import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-matters',
  templateUrl: './matters.component.html',
  styleUrls: ['./matters.component.scss'],
})
export class MattersComponent {
  apiUrls = API_Config.matters;
  _languageService = inject(LanguageService);
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
}
