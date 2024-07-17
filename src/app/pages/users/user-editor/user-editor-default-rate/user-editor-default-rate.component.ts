import { Component, Input, OnInit, inject } from '@angular/core';
import {
  User_Default_Rate_Columns_AR,
  User_Default_Rate_Columns_EN,
  User_Default_Rate_Columns_FR,
} from './user-editor-default-rate-columns.config';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { LanguageService } from '@core/services';
import { UserEditorDefaultRateEditorComponent } from './user-editor-default-rate-editor/user-editor-default-rate-editor.component';
import { API_Config } from '@core/api/api-config/api.config';
import { PAGESIZE } from '@core/utilities/defines';

@Component({
  selector: 'app-user-editor-default-rate',
  templateUrl: './user-editor-default-rate.component.html',
  styleUrls: ['./user-editor-default-rate.component.scss'],
})
export class UserEditorDefaultRateComponent implements OnInit {
  @Input() requestId: string;
  _languageService = inject(LanguageService);
  additionalTableConfig: TableConfig = {
    id: 'id',
    actions: [
      {
        type: 'update',
        title: this._languageService.getTransValue('lookups.updateSubItem'),
        target: UserEditorDefaultRateEditorComponent,
        icon: 'pencil',
        width: '30%',
        permission:'Update_Users'
      },
    ],
  };
  filterOptions: any = {
    pageNum: 1,
    pagSize: PAGESIZE,
    orderByDirection: 'ASC',
  };

  columnsLocalized = {
    en: User_Default_Rate_Columns_EN,
    ar: User_Default_Rate_Columns_AR,
    fr: User_Default_Rate_Columns_FR,
  };
  apiUrls = API_Config.usersRate;
  ngOnInit(): void {
    if (this.requestId)
      this.filterOptions = {
        ...this.filterOptions,
        userId: this.requestId,
      };
  }
  mapData(data: any[]) {
    return data.map((obj) => {
      return {
        ...obj,
        activeText: obj.active ? 'Active' : 'Inactive',
      };
    });
  }
}
