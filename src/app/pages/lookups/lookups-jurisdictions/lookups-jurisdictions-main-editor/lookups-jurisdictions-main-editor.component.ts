import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBaseClass } from '@core/classes/form-base.class';
import { SharedModule } from '@shared/shared.module';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { ButtonModule } from 'primeng/button';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiRes } from '@core/models';
import { finalize } from 'rxjs';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-lookups-jurisdictions-main-editor',
  standalone: true,
  imports: [CommonModule,SharedModule,ButtonModule,FormlyConfigModule],
  templateUrl: './lookups-jurisdictions-main-editor.component.html',
  styleUrls: ['./lookups-jurisdictions-main-editor.component.scss']
})
export class LookupsJurisdictionsMainEditorComponent extends FormBaseClass implements OnInit {
  title: string;
  config = inject(DynamicDialogConfig);
  dialogRef = inject(DynamicDialogRef);
  ngOnInit(): void {
    console.log(this.config?.data?.rowData)
    if (this.config?.data?.rowData) this.getData();
    this.initForm()

  }

  override initForm(): void {
    this.formlyFields = [
      {
        key: 'nameEn',
        type: 'input',
        props: {
          label: this._languageService.getTransValue('lookups.nameEN'),
          required:true
        },
        validators: {
          validation: ['englishLetters'],
        }
      },
      {
        key: 'nameAr',
        type: 'input',
        props: {
          label: this._languageService.getTransValue('lookups.nameAR'),
          required:true
        },
        validators: {
          validation: ['arabicLetters'],
        }
      },
      {
        key: 'active',
        type: 'switch',
        defaultValue: false,
        props: {
          label: this._languageService.getTransValue('lookups.active'),
          class: 'd-block',
        },
      },
    ]
  }
  override getData(): void {
    this.formlyModel = {...this.config?.data?.rowData};
  }
  override onSubmit(): void {
    if (this.formly.invalid) return;

    console.log(this.formlyModel);
    const successMsgKey = this.config?.data?.rowData
      ? 'messages.updateSuccessfully'
      : 'messages.createdSuccessfully';
    const requestPayload = this.config?.data?.rowData
      ? { ...this.formlyModel, id: this.config?.data?.rowData?.id }
      : this.formlyModel;
    const path = this.config?.data?.rowData
      ? API_Config.jurisdictions.update
      : API_Config.jurisdictions.create;

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
              this.dialogRef.close(dialog)
            });
          }else{
            this._toastrNotifiService.displayErrorToastr(res?.message)
          }
        },
        error:(err:any)=>{
          this._toastrNotifiService.displayErrorToastr(err?.error?.message);
        }
      });
  }

}
