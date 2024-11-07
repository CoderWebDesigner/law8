import { Component, OnInit } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-matter-billing-taxes',
  templateUrl: './matter-billing-taxes.component.html',
  styleUrls: ['./matter-billing-taxes.component.scss'],
  standalone:true,
  imports:[FormlyConfigModule,SharedModule]
})
export class MatterBillingTaxesComponent extends FormBaseClass implements OnInit{
  ngOnInit(): void {
    this.initForm();
  }
  override initForm(): void {
    this.formlyFields=[{
      fieldGroupClassName:'row',
      fieldGroup:[
        {
          className:'col-md-6',
          key:'salesTaxOnDisbursements',
          type:'input',
          defaultValue:0,
          props:{
            label:this._languageService.getTransValue('matters.salesTaxOnDisbursements'),
            pKeyFilter:'int'
          }
        },
        {
          className:'col-md-6',
          key:'salesTaxOnFees',
          type:'input',
          defaultValue:0,
          props:{
            label:this._languageService.getTransValue('matters.salesTaxOnFees'),
            pKeyFilter:'int'
          }
        },
      ]
    }]
  }
  override onSubmit(): void {
    throw new Error('Method not implemented.');
  }
}
