import { Component, OnInit } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';
import { combineLatest, finalize } from 'rxjs';

@Component({
  selector: 'app-bank-account-editor',
  templateUrl: './bank-account-editor.component.html',
  styleUrls: ['./bank-account-editor.component.scss'],
  standalone: true,
  imports: [FormlyConfigModule, SharedModule],
})
export class BankAccountEditorComponent
  extends FormBaseClass
  implements OnInit
{
  rowData:any;
  ngOnInit(): void {
    
    this.getLookupsData()
    if(this._dynamicDialogConfig.data){
      this.rowData=this._dynamicDialogConfig.data.rowData
      this.formlyModel=this.rowData

    }
  }
  override getLookupsData(): void {
      combineLatest({
        bankType:this._apiService.get(API_Config.general.getBankAccountsTypeLookup),
        glAccount:this._apiService.get(API_Config.general.getGlAccountsTypeLookup),
      }).pipe(this._sharedService.takeUntilDistroy()).subscribe({
        next:(res:any)=>{
          console.log('getLookupsData',res)
          this.lookupsData=res
          this.initForm();
        }
      })
  }

  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'bankId',
            type: 'input',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('bankId'),
            },
          },
          {
            key: 'bankTypeId',
            type: 'select',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('bankAccount.bankTypeId'),
              options:this.lookupsData.bankType.result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },
          {
            key: 'accountName',
            type: 'input',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('bankAccount.accountName'),
            },
          },
          {
            key: 'accountNo',
            type: 'input',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('bankAccount.accountNo'),
            },
          },
          {
            key: 'address',
            type: 'input',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('bankAccount.address'),
            },
          },
          {
            key: 'swiftCode',
            type: 'input',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('bankAccount.swiftCode'),
            },
          },
          {
            key: 'iban',
            type: 'input',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('bankAccount.iban'),
            },
          },
          {
            key: 'branchName',
            type: 'input',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('bankAccount.branchName'),
            },
          },
          {
            key: 'accountHolder',
            type: 'input',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('bankAccount.accountHolder'),
            },
          },
          {
            key: 'glAccountId',
            type: 'select',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('bankAccount.glAccountId'),
              options:this.lookupsData.glAccount.result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },
        ],
      },
    ];
  }

  override onSubmit(): void {
    if (this.formly.invalid){
      const text = this._languageService.getTransValue('messages.checkDataValidation');
      this._toastrNotifiService.displayErrorToastr(text);
      this.formly.markAllAsTouched()
      return;
    } 

    const successMsgKey = this.rowData
      ? 'messages.updateSuccessfully'
      : 'messages.createdSuccessfully';

    const path = this.rowData ? API_Config.bankAccount.update :  API_Config.bankAccount.create;

    this._apiService
      .post(path, this.formlyModel)
      .pipe(
        finalize(() => (this.isSubmit = false)),
        this.takeUntilDestroy()
      )
      .subscribe({
        next: (res: ApiRes) => {
          if (res && res.isSuccess) {
            const text = this._languageService.getTransValue(successMsgKey);
            this._toastrNotifiService.displaySuccessMessage(text);
           this._dynamicDialogRef.close(true)
          } else {
            this._toastrNotifiService.displayErrorToastr(res?.message);
          }
        },
        error: (err: any) => {
          this._toastrNotifiService.displayErrorToastr(err?.error?.message);
        },
      });

  }
}
