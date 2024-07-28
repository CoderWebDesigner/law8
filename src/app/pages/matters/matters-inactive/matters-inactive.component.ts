import { Component, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { LanguageService } from '@core/services';
import { PAGESIZE } from '@core/utilities/defines';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { Matters_Columns_EN, Matters_Columns_FR, Matters_Columns_AR } from '../matter-columns.config';

@Component({
  selector: 'app-matters-inactive',
  templateUrl: './matters-inactive.component.html',
  styleUrls: ['./matters-inactive.component.scss']
})
export class MattersInactiveComponent {
  apiUrls = API_Config.inActiveMatters;
  _languageService = inject(LanguageService);
  additionalTableConfig: TableConfig = {
    id: 'id',
    actions: [
      {
        title: this._languageService.getTransValue('matters.matterDetails'),
        targetType: 'path',
        target: '/matters/inactive/view/',
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
    lang:'en'
  };
}
