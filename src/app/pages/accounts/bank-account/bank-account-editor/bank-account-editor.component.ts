import { Component, OnInit } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';


@Component({
  selector: 'app-bank-account-editor',
  templateUrl: './bank-account-editor.component.html',
  styleUrls: ['./bank-account-editor.component.scss'],
  standalone: true,
  imports: [FormlyConfigModule, SharedModule],
})
export class BankAccountEditorComponent   extends FormBaseClass implements OnInit{
  ngOnInit(): void {
    this.initForm()
  }
  override initForm(): void {
    // id, banktype,generalLedger,accountname,accountNo,address,swiftCode,Iban,branch,accountHolder
    this.formlyFields=[
      {
        fieldGroupClassName:'row',
        fieldGroup:[
          {
            key:'id',
            type:'input',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('id')
            }
          },
          {
            key:'banktype',
            type:'select',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('banktype')
            }
          },
          {
            key:'accountname',
            type:'input',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('accountname')
            }
          },
          {
            key:'accountNo',
            type:'input',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('accountNo')
            }
          },
          {
            key:'address',
            type:'input',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('address')
            }
          },
          {
            key:'swiftCode',
            type:'input',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('swiftCode')
            }
          },
          {
            key:'Iban',
            type:'input',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('Iban')
            }
          },
          {
            key:'branch',
            type:'select',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('branch')
            }
          },
          {
            key:'accountHolder',
            type:'input',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('accountHolder')
            }
          },
        ]
      }
    ]
  }
  override onSubmit(): void {
    throw new Error('Method not implemented.');
  }
  

}
