import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';
import { SharedService } from '@shared/services/shared.service';


@Component({
  selector: 'app-matter-editor-payment-terms',
  templateUrl: './matter-editor-payment-terms.component.html',
  styleUrls: ['./matter-editor-payment-terms.component.scss']
})
export class MatterEditorPaymentTermsComponent extends FormBaseClass implements OnInit{
  @Output() onFormSubmit = new EventEmitter()
  ngOnInit(): void {
    this.initForm()
    this.detectFormChange()
  }
  detectFormChange(){
    this.formly.valueChanges.pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next:res=>{
        this.onSubmit()
      }
    })
  }
  override initForm(): void {
    this.formlyFields=[
      {
        fieldGroupClassName:'row',
        fieldGroup:[
          {
            type:'input',
            key:'frequancy',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.frequancy'),
            }
          },
          {
            type:'input',
            key:'billingTemplate',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.billingTemplate'),
            }
          },
          {
            type:'input',
            key:'emailTemplate',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.emailTemplate'),
            }
          },
          {
            className: 'col-12',
            template: `<h5 class="my-4 line-title overflow-hidden"> <span class="me-3">${this._languageService.getTransValue("matters.disbursment")}</span></h5>`,
          },
          {
            type:'checkbox',
            key:'automaticallyCreateDisability',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.automaticallyCreateDisability'),
            }
          },
          {
            type:'select',
            key:'disability',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.disability'),
              options:[
                {label:'Option 1', value:'Option 1'},
                {label:'Option 2', value:'Option 2'},
                {label:'Option 3', value:'Option 3'},
              ]
            }
          },
          {
            type:'input',
            key:'amountAndPrecentage',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.amountAndPrecentage'),
              type:'number',
              min:0
            }
          },
          {
            className: 'col-12',
            template: `<h5 class="my-4 line-title overflow-hidden"> <span class="me-3">${this._languageService.getTransValue("matters.fees")}</span></h5>`,
          },
          {
            type:'checkbox',
            key:'useTaskBasedBilling',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.useTaskBasedBilling'),
            }
          },
          {
            type:'checkbox',
            key:'applyDiscountFees',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.applyDiscountFees'),
            }
          },
          {
            type:'input',
            key:'discount',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.discount'),
              type:'number',
              min:0,
              max:100
            }
          },
          {
            type:'input',
            key:'quoteType',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.quoteType'),
            }
          },
          {
            type:'input',
            key:'amount',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.amount'),
              type:'number',
              min:0
            }
          },
          {
            type:'input',
            key:'maximumFee',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.maximumFee'),
              type:'number',
              min:0
            }
          },
        ]
      }
    ]
  }

  override onSubmit(): void {
    this.onFormSubmit.emit(this.formlyModel)
  }

}
