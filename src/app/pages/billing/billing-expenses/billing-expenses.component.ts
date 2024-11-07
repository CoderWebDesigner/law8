import { Component, inject } from '@angular/core';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { Billing_Expenses_Columns_AR, Billing_Expenses_Columns_EN, Billing_Expenses_Columns_FR } from './billing-expenses-columns.config';
import { LanguageService } from '@core/services';
import { BillingExpensesEditorComponent } from './billing-expenses-editor/billing-expenses-editor.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-billing-expenses',
  templateUrl: './billing-expenses.component.html',
  styleUrls: ['./billing-expenses.component.scss']
})
export class BillingExpensesComponent {
  _languageService=inject(LanguageService);
  _dialogService=inject(DialogService)
  additionalTableConfig: TableConfig = {
    id: 'id',
    isSearch:true,
    actions: [
      {
        target:BillingExpensesEditorComponent,
        title: this._languageService.getTransValue('users.updateUser'),
        icon:'pencil',
        permission:'Update_Users'
      },
    ],
  };
  columnsLocalized = {
    en: Billing_Expenses_Columns_EN,
    fr: Billing_Expenses_Columns_FR,
    ar:  Billing_Expenses_Columns_AR,
  };
  data:any[]= [
    {
      date: '2024-10-01',
      paidTo: 'John Doe',
      type: 'Service',
      check: 'Yes',
      matterNo: 'MAT001',
      lawyer: 'Jane Smith',
      count: 2,
      price: 150.00,
      amount: 300.00,
      hold: 'Never Bill'
    },
    {
      date: '2024-10-02',
      paidTo: 'Acme Corp',
      type: 'Product',
      check: 'No',
      matterNo: 'MAT002',
      lawyer: 'Bob Johnson',
      count: 1,
      price: 500.00,
      amount: 500.00,
      hold: 'Hold'
    },
    {
      date: '2024-10-03',
      paidTo: 'Emily Clark',
      type: 'Consultation',
      check: 'Yes',
      matterNo: 'MAT003',
      lawyer: 'Alice Brown',
      count: 3,
      price: 200.00,
      amount: 600.00,
      hold: 'No Hold'
    },

  ];
  
  openBillingExpensesEditor(){
    this._dialogService.open(BillingExpensesEditorComponent,{
      width:'70vw'
    })

  }
  
}
