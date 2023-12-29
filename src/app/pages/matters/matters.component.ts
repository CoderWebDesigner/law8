import { Component, inject } from '@angular/core';
import { AuthService, LanguageService } from '@core/services';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';

@Component({
  selector: 'app-matters',
  templateUrl: './matters.component.html',
  styleUrls: ['./matters.component.scss']
})
export class MattersComponent {
  _languageService=inject(LanguageService)
  additionalTableConfig: TableConfig = {
    id: 'Code',
    actions: [
      {
        title: this._languageService.getTransValue('client.clientDetails'),
        targetType: 'path',
        target: '/matters/view/',
        icon:'eye'
      },
    ],
  };

}
