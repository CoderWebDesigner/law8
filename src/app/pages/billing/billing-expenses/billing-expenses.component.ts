import { Component, inject } from '@angular/core';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { Billing_Expenses_Columns_AR, Billing_Expenses_Columns_EN, Billing_Expenses_Columns_FR } from './billing-expenses-columns.config';
import { LanguageService } from '@core/services';
import { BillingExpensesEditorComponent } from './billing-expenses-editor/billing-expenses-editor.component';
import { DialogService } from 'primeng/dynamicdialog';
import { API_Config } from '@core/api/api-config/api.config';
import { SharedService } from '@shared/services/shared.service';
import { ApiService } from '@core/api/api.service';
import { ApiRes } from '@core/models';

@Component({
  selector: 'app-billing-expenses',
  templateUrl: './billing-expenses.component.html',
  styleUrls: ['./billing-expenses.component.scss']
})
export class BillingExpensesComponent {

  _languageService=inject(LanguageService);
  _dialogService=inject(DialogService);
  _sharedService=inject(SharedService)
  _apiService=inject(ApiService)
  apiUrls=API_Config.billing;
  additionalTableConfig: TableConfig = {
    id: 'id',
    // isSearch:true,
    // actions: [
    //   {
    //     target:BillingExpensesEditorComponent,
    //     title: this._languageService.getTransValue('users.updateUser'),
    //     icon:'pencil',
    //     permission:'Update_Users'
    //   },
    // ],
  };
  columnsLocalized = {
    en: Billing_Expenses_Columns_EN,
    fr: Billing_Expenses_Columns_FR,
    ar:  Billing_Expenses_Columns_AR,
  };
  data:any[]=[]
  openBillingExpensesEditor(){
    const billingExpensesEditor = this._dialogService.open(BillingExpensesEditorComponent,{
      width:'70vw'
    })
    billingExpensesEditor.onClose.pipe(this._sharedService.takeUntilDistroy()).subscribe({
      next:(res)=>{
        if(res) this.data.push(res)
      }
    })

  }
  save(){
    this._apiService.post(API_Config.billing.create,this.data).pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next:(res:ApiRes)=>{
        console.log(res)
        this.data=[]
      }
    })
    console.log('data list' ,this.data)
  }
  
}
