import { Component, inject } from '@angular/core';
import { GlAccountEditorComponent } from './gl-account-editor/gl-account-editor.component';
import { API_Config } from '@core/api/api-config/api.config';
import { LanguageService } from '@core/services';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';
import { SharedService } from '@shared/services/shared.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Gl_Account_Columns_EN, Gl_Account_Columns_FR, Gl_Account_Columns_AR } from './gl-account-columns.config';

@Component({
  selector: 'app-gl-account',
  templateUrl: './gl-account.component.html',
  styleUrls: ['./gl-account.component.scss']
})
export class GlAccountComponent {
  _languageService = inject(LanguageService);
  _dialogService = inject(DialogService);
  _sharedService=inject(SharedService);
  _sharedTableService=inject(SharedTableService)
  apiUrls = API_Config.glAccount;
  additionalTableConfig: TableConfig = {
    id: 'id',
    isSearch: true,
    actions: [
      {
        target: GlAccountEditorComponent,
        title: this._languageService.getTransValue('update bank account'),
        icon: 'pencil',
        permission: 'Update_Users',
      },
      {
        type: 'delete',
        title: this._languageService.getTransValue('btn.delete'),
        icon: 'trash',
        permission:'Delete_ClientContact'
      },
    ],
  };

  columnsLocalized = {
    en: Gl_Account_Columns_EN,
    fr: Gl_Account_Columns_FR,
    ar: Gl_Account_Columns_AR,
  };

  openGlAccountEditor(rowData?:any) {
    const glAccountEditor=this._dialogService.open(GlAccountEditorComponent, {
      header:rowData?'Update Gl Account':'Add Gl Account',
      width: '55vw',
      data:rowData
    });
    glAccountEditor.onClose.pipe(this._sharedService.takeUntilDistroy()).subscribe({
      next:(res)=>{
        if(res) this._sharedTableService.refreshData.next(true)
      }
    })
  }
}
