import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBaseClass } from '@core/classes/form-base.class';
import { SharedModule } from '@shared/shared.module';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { Main_List_Types } from '@components/lookups/const/main-list-types';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiRes } from '@core/models';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-lookups-sub-item-editor',
  standalone: true,
  imports: [CommonModule, SharedModule, FormlyConfigModule],
  templateUrl: './lookups-sub-item-editor.component.html',
  styleUrls: ['./lookups-sub-item-editor.component.scss'],
})
export class LookupsSubItemEditorComponent
  extends FormBaseClass
  implements OnInit
{
  title: string;
  itemId: number;
  config = inject(DynamicDialogConfig);
  dialogRef = inject(DynamicDialogRef)
  apiUrls
  ngOnInit(): void {
    if (this.config?.data?.rowData) this.getData();
    if(this.config?.data?.url) this.apiUrls=this.config?.data?.url
    this.initForm();
  }

  override initForm(): void {
    console.log(this.config.data);
    this.formlyFields = [
      {
        key: 'mainItem',
        type: 'select',
        // hide:,
        props: {
          // required: true,
          label: this._languageService.getTransValue('lookups.mainCategory'),
          options: Main_List_Types.map((obj) => ({
            label:
              this._languageService.getSelectedLanguage() == 'ar'
                ? obj.nameAR
                : obj.nameEN,
            value: 1,
          })),
        },
      },
      {
        key: 'nameEn',
        type: 'input',
        props: {
          label: this._languageService.getTransValue('lookups.nameEN'),
          required: true,
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
        },
      },
    ];
  }
  override getData(): void {
    this.formlyModel = {...this.config?.data?.rowData};
  }
  override onSubmit(): void {
    if (this.formly.invalid) return;

    console.log(this.formlyModel);
    // const successMsgKey = this.itemId
    //   ? 'message.updateSuccessfully'
    //   : 'message.createdSuccessfully';
    const requestPayload = this.config?.data?.rowData
      ? { ...this.formlyModel, id: this.config?.data?.rowData?.id }
      : this.formlyModel;
    const path = this.config?.data?.rowData
      ? this.apiUrls.update 
      : this.apiUrls.create;

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
            // const text = this._languageService.getTransValue(successMsgKey);
            // this._toastrNotifiService.displaySuccessMessage(text);
            this._DialogService.dialogComponentRefMap.forEach((dialog) => {
              this.dialogRef.close(dialog)
            });
          }else{
            this._toastrNotifiService.displayErrorToastr(res?.message)
          }
        },
      });
  }
}
