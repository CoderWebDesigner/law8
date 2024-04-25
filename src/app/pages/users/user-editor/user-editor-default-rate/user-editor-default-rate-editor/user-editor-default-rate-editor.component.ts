import { Component, OnInit } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-user-editor-default-rate-editor',
  templateUrl: './user-editor-default-rate-editor.component.html',
  styleUrls: ['./user-editor-default-rate-editor.component.scss'],
  standalone: true,
  imports: [ SharedModule, ButtonModule, FormlyConfigModule],
})
export class UserEditorDefaultRateEditorComponent extends FormBaseClass implements OnInit {
  ngOnInit(): void {
    if (this._dynamicDialogConfig?.data?.rowData) this.getData();
    this.initForm()
  }

  override initForm(): void {
    console.log(this._dynamicDialogConfig.data);
    this.formlyFields = [

      {
        key: 'rate',
        type: 'input',
        props: {
          label: this._languageService.getTransValue('lookups.rateName'),
          disabled: true,
          
        },
        validators: {
          validation: ['englishLetters'],
        },
      },
      {
        key: 'name',
        type: 'input',
        props: {
          label: this._languageService.getTransValue('lookups.rateName'),
          disabled: true,
        },
        validators: {
          validation: ['englishLetters'],
        },
      },
      {
        key: 'amount',
        type: 'input',
        props: {
          label: this._languageService.getTransValue('lookups.amount'),
          required: true,
        },
        validators: {
          validation: ['arabicLetters'],
        },
      },
      {
        key: 'active',
        type: 'switch',
        defaultValue: false,
        props: {
          label: this._languageService.getTransValue('lookups.active'),
          class: 'd-block',
          disabled:true
        },
      },
    ];
  }
  override getData(): void {
    this.formlyModel = { ...this._dynamicDialogConfig?.data?.rowData };
  }

  override onSubmit(): void {
    if (this.formly.invalid) return;

    console.log(this.formlyModel);
    const successMsgKey = 'messages.createdSuccessfully';
    const requestPayload = this._dynamicDialogConfig?.data?.rowData
      ? { ...this.formlyModel, id: this._dynamicDialogConfig?.data?.rowData?.id }
      : this.formlyModel;
    const path = API_Config.usersRate.update

    this._apiService
      .post(path, requestPayload)
      .pipe(
        finalize(() => (this.isSubmit = false)),
        this.takeUntilDestroy()
      )
      .subscribe({
        next: (res: ApiRes) => {
          if (res && res.isSuccess) {
            const text = this._languageService.getTransValue(successMsgKey);
            this._toastrNotifiService.displaySuccessMessage(text);
            this._DialogService.dialogComponentRefMap.forEach((dialog) => {
              this._dynamicDialogRef.close(dialog);
            });
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
