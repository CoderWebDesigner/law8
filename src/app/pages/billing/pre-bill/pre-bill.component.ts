import { Component, OnInit } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';

@Component({
  selector: 'app-pre-bill',
  templateUrl: './pre-bill.component.html',
  styleUrls: ['./pre-bill.component.scss']
})
export class PreBillComponent extends FormBaseClass implements OnInit {
  ngOnInit(): void {
    this.initForm()
  }
  override initForm(): void {
   this.formlyFields=[
    {
      fieldGroupClassName:'row',
      key:'info',
      fieldGroup:[
        {
          key:'matter',
          className:'col-md-4',
          type:'select',
          props:{
            label:'matter',
            options:[
              {label:'matter 1',value:'matter 1'}
            ]
          }
        },
        {
          key:'matter',
          className:'col-md-4',
          type:'input',
          props:{
            label:'client name',
          }
        },
        {
          key:'template',
          className:'col-md-4',
          type:'select',
          props:{
            label:'template',
            options:[
              {label:'template 1',value:'template 1'}
            ]
          }
        },
        {
          key:'date',
          className:'col-md-4',
          type:'date',
          props:{
            label:'A/R Date',
          }
        },
      ]
    },
    {
      fieldGroupClassName:'row',
      key:'time',
      fieldGroup:[
        {
          type:'date',
          key:'billFrom',
          className:'col-md-3',
          props:{
            label:'Bill From'
          },
          hooks: {
            onInit: () => {
              this.formly.get('time.billFrom').valueChanges.pipe(
                this._sharedService.takeUntilDistroy()
              ).subscribe({
                next:(res:any)=>{
                  this.formly.get('expenses.startDate').setValue(new Date(res))
                }
              })
            },
          },
        },
        {
          type:'date',
          key:'billTo',
          className:'col-md-3',
          props:{
            label:'Bill To'
          },
          hooks: {
            onInit: () => {
              this.formly.get('time.billTo').valueChanges.pipe(
                this._sharedService.takeUntilDistroy()
              ).subscribe({
                next:(res:any)=>{
                  this.formly.get('expenses.endDate').setValue(new Date(res))
                }
              })
            },
          },
        },
        {
          type:'checkbox',
          key:'neverBillEntries',
          className:'col-md-3 d-flex align-items-center',
          props:{
            label:'Never Bill Entries',
          }
        },
        {
          type:'checkbox',
          key:'neverBillEntries',
          className:'col-md-3 d-flex align-items-center',
          props:{
            label:'Include Held Entries',
          }
        },
        {
          key:'feesData'
        }
      ]
    },
    {
      fieldGroupClassName:'row',
      key:'expenses',
      fieldGroup:[
        {
          type:'date',
          key:'startDate',
          className:'col-md-3',
          props:{
            label:'Start Date'
          }
        },
        {
          type:'date',
          key:'endDate',
          className:'col-md-3',
          props:{
            label:'End Date'
          }
        },
        {
          type:'checkbox',
          key:'neverBillEntries',
          className:'col-md-3 d-flex align-items-center',
          props:{
            label:'Never Bill Entries',
          }
        },
        {
          type:'checkbox',
          key:'neverBillChanges',
          className:'col-md-3 d-flex align-items-center',
          props:{
            label:'Include Held Changes',
          }
        },
        {
          key:'expensesData'
        }
      ]
    },
    {
      fieldGroupClassName:'row',
      key:'summary',
      fieldGroup:[
        {
          className: 'col-12',
          template: `<h5 class="my-4 line-title overflow-hidden"> <span class="me-3">${this._languageService.getTransValue(
            'Summary'
          )}</span></h5>`,
        },
        {
          className:'col-md-3',
          template:`<span class="fw-bold">${this._languageService.getTransValue(
            'Total Fees'
          )}</span>`
        },
        {
          key:'totalFees',
          className:'col-md-3',
          defaultValue:0,
          type:'input',
          props:{
            readonly:true
          }
          
        },
        {
          className:'col-md-3',
          template:`<span class="fw-bold">${this._languageService.getTransValue(
            'Previous Balance'
          )}</span>`
        },
        {
          key:'previousBalance',
          className:'col-md-3',
          defaultValue:0,
          type:'input',
          props:{
            readonly:true
          }
        },

        {
          className:'col-md-3',
          template:`<span class="fw-bold">${this._languageService.getTransValue(
            'Taxes'
          )}</span>`
        },
        {
          key:'taxes',
          className:'col-md-3',
          defaultValue:0,
          type:'input',
          props:{
            readonly:true
          }
          
        },
        {
          className:'col-md-3',
          template:`<span class="fw-bold">${this._languageService.getTransValue(
            'Trust Bank Account'
          )}</span>`
        },
        {
          key:'trustBankAccount',
          className:'col-md-3',
          defaultValue:0,
          type:'input',
          props:{
            readonly:true
          }
        },
        {
          className:'col-md-3',
          template:`<span class="fw-bold">${this._languageService.getTransValue(
            'Total Expenses'
          )}</span>`
        },
        {
          key:'totalExpenses',
          className:'col-md-3',
          defaultValue:0,
          type:'input',
          props:{
            readonly:true
          }
        },
        {
          fieldGroupClassName:'row',
          fieldGroup:[
            {
              className:'col-md-3',
              template:`<span class="fw-bold">${this._languageService.getTransValue(
                'Taxes'
              )}</span>`
            },
            {
              key:'taxes',
              className:'col-md-3',
              defaultValue:0,
              type:'input',
              props:{
                readonly:true
              }
              
            },
            {
              className:'col-md-6',
              fieldGroupClassName:'row bg-secondary-subtle',
              fieldGroup:[
                {
                  className:'col-6',
                  template:`<span class="fw-bold d-inline-block py-3">${this._languageService.getTransValue(
                    'Grand Total'
                  )}</span>`
                },
                {
                  key:'grandTotal',
                  className:'col-6',
                  defaultValue:0,
                  type:'input',
                  props:{
                    readonly:true
                  }
                },
              ]
            }
          ]
        }
        
      ]
    }
   ]
  }

  getFields(keyName:string){
   return this.formlyFields.filter(fields=>fields.key==keyName)
  }
  override onSubmit(): void {
    console.log(this.formlyModel)
  }

}
