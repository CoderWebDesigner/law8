import { Component, inject, OnInit } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';
import {
  Billing_Rate_Exception_Columns_EN,
  Billing_Rate_Exception_Columns_FR,
  Billing_Rate_Exception_Columns_AR,
} from './matter-billing-rate-exceptions-columns.config';
import { FormlyService } from '@shared/modules/formly-config/services/formly.service';

@Component({
  selector: 'app-matter-billing-rate-exception',
  templateUrl: './matter-billing-rate-exception.component.html',
  styleUrls: ['./matter-billing-rate-exception.component.scss'],
  standalone: true,
  imports: [FormlyConfigModule, SharedModule],
})
export class MatterBillingRateExceptionComponent
  extends FormBaseClass
  implements OnInit
{
  _formlyService=inject(FormlyService)
  columnsLocalized = {
    en: Billing_Rate_Exception_Columns_EN,
    fr: Billing_Rate_Exception_Columns_FR,
    ar: Billing_Rate_Exception_Columns_AR,
  };
  ngOnInit(): void {
    
    this.initForm();
  }
  addTerm() {
    this._formlyService.addRow$.next(true)
  }
  override initForm(): void {
    this.formlyFields = [
      {
        className: 'col-12',
        key: 'rateExceptions',
        type: 'table',
        props: {
          columns:
            this.columnsLocalized[this._languageService.getSelectedLanguage()],
          withClientPaginator: true,
        },
        fieldArray: {
          fieldGroup:[
            {
              key:'initial',
              type:'input'
            },
            {
              key:'lawyerName',
              type:'input'
            },
            {
              key:'task',
              type:'input'
            },
            {
              key:'taskName',
              type:'input'
            },
            {
              key:'rate',
              type:'input'
            },
           {
            type: 'button',
            // className: this.isView ? 'd-none' : '',
            props: {
              iconOnly: true,
              class: 'p-button-label p-button-outlined border-0 text-danger mb-3',
              icon: 'pi pi-trash fs-5',
              onClick: (field: any) => {
                this._formlyService.removeRow$.next(field.parent.index)
              }
            },
           }
          ]
        }
      },
    ];
    this.addTerm()
  }
  override onSubmit(): void {
    console.log('form array',this.formlyModel)
  }
}
