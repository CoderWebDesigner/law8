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

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss'],
})
export class BankAccountComponent {
  _languageService = inject(LanguageService);
  _dialogService = inject(DialogService);
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
    ],
  };

  columnsLocalized = {
    en: Bank_Account_Columns_EN,
    fr: Bank_Account_Columns_FR,
    ar: Bank_Account_Columns_AR,
  };
  data: any[] = [
    {
      accountId: "12345",
      bankType: "Checking",
      bankName: "Bank of America",
      glAccount: "GL-1001"
    },
    {
      accountId: "67890",
      bankType: "Savings",
      bankName: "Chase",
      glAccount: "GL-1002"
    },
    {
      accountId: "11223",
      bankType: "Business",
      bankName: "Wells Fargo",
      glAccount: "GL-1003"
    },
    {
      accountId: "44556",
      bankType: "Credit",
      bankName: "Citibank",
      glAccount: "GL-1004"
    },
    {
      accountId: "77889",
      bankType: "Investment",
      bankName: "Goldman Sachs",
      glAccount: "GL-1005"
    }
  ];

  openBankAccountEditor(rowData?:any) {
    this._dialogService.open(BankAccountEditorComponent, {
      header:rowData?'Update Bank Account':'Add Bank Account',
      width: '50vw',
      data:rowData
    });
  }
}

