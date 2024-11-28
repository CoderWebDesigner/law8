import { Component, inject } from '@angular/core';
import { BankAccountEditorComponent } from './bank-account-editor/bank-account-editor.component';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { LanguageService } from '@core/services';
import { DialogService } from 'primeng/dynamicdialog';
import {
  Bank_Account_Columns_AR,
  Bank_Account_Columns_EN,
  Bank_Account_Columns_FR,
} from './bank-account-columns.config';
import { API_Config } from '@core/api/api-config/api.config';
import { SharedService } from '@shared/services/shared.service';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss'],
})
export class BankAccountComponent {
  _languageService = inject(LanguageService);
  _dialogService = inject(DialogService);
  _sharedService=inject(SharedService);
  _sharedTableService=inject(SharedTableService)
  apiUrls = API_Config.bankAccount;
  additionalTableConfig: TableConfig = {
    id: 'id',
    isSearch: true,
    actions: [
      {
        target: BankAccountEditorComponent,
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
    en: Bank_Account_Columns_EN,
    fr: Bank_Account_Columns_FR,
    ar: Bank_Account_Columns_AR,
  };

  openBankAccountEditor(rowData?:any) {
    const bankAccountEditor=this._dialogService.open(BankAccountEditorComponent, {
      header:rowData?'Update Bank Account':'Add Bank Account',
      width: '55vw',
      data:rowData
    });
    bankAccountEditor.onClose.pipe(this._sharedService.takeUntilDistroy()).subscribe({
      next:(res)=>{
        if(res) this._sharedTableService.refreshData.next(true)
      }
    })
  }
}

