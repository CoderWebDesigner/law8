import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-lookups-main-item-editor',
  templateUrl: './lookups-main-item-editor.component.html',
  styleUrls: ['./lookups-main-item-editor.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    FormlyConfigModule
  ],
})
export class LookupsMainItemEditorComponent extends FormBaseClass implements OnInit {
  title: string;
  itemId: number;
  ngOnInit(): void {
    this.getParams()

  }
  getParams() {
    this.itemId = +this._route.snapshot.paramMap.get('id');
    if (this._dynamicDialogConfig?.data?.rowData) this.getData();
    this.initForm()
  }
  override getData(): void {
    this.formlyModel = {...this._dynamicDialogConfig.data?.rowData}
  }
  override initForm(): void {
     console.log(this._dynamicDialogConfig)
    this.formlyFields = [
      {
        key: 'nameEn',
        type: 'input',
        props: {
          label: this._languageService.getTransValue('lookups.nameEN'),
          required: this._languageService.getSelectedLanguage() == 'en',
        },
        validators: {
          validation: ['englishLetters'],
        },
      },
      {
        key: 'nameAr',
        type: 'input',
        props: {
          label: this._languageService.getTransValue('lookups.nameAR'),
          required: this._languageService.getSelectedLanguage() == 'ar',
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
        },
      },
    ]
  }
  override onSubmit(): void {
    if (this.formly.invalid) return;

    console.log(this.formlyModel);
    const successMsgKey = this._dynamicDialogConfig?.data?.rowData
      ? 'messages.updateSuccessfully'
      : 'messages.createdSuccessfully';
    const requestPayload = this._dynamicDialogConfig?.data?.rowData
      ? { ...this.formlyModel, id: this._dynamicDialogConfig?.data?.rowData?.id }
      : this.formlyModel;
    const path = this._dynamicDialogConfig?.data?.rowData
      ?this._dynamicDialogConfig?.data?.apiUrls?.update
      : this._dynamicDialogConfig?.data?.apiUrls?.create;

    console.log(requestPayload);
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
