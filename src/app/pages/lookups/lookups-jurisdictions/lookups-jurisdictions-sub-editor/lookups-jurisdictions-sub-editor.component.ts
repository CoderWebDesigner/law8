import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Main_List_Types } from '@components/lookups/const/main-list-types';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { SharedModule } from '@shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedService } from '@shared/services/shared.service';

@Component({
  selector: 'app-lookups-jurisdictions-sub-editor',
  standalone: true,
  imports: [CommonModule, SharedModule, ButtonModule, FormlyConfigModule],
  templateUrl: './lookups-jurisdictions-sub-editor.component.html',
  styleUrls: ['./lookups-jurisdictions-sub-editor.component.scss'],
})
export class LookupsJurisdictionsSubEditorComponent
  extends FormBaseClass
  implements OnInit
{
  title: string;

  config = inject(DynamicDialogConfig);
  dialogRef = inject(DynamicDialogRef);
  ngOnInit(): void {
    if (this.config?.data?.rowData) this.getData();
    this.getLookupsData()
   
  }

  override initForm(): void {
    console.log(this.config.data);
    this.formlyFields = [
      {
        key: 'law_JurisdictionId',
        type: 'select',
        props: {
          // required: true,
          label: this._languageService.getTransValue('lookups.mainCategory'),
          options: this.lookupsData.map((obj) => ({
            label: obj?.name,
            value: obj?.id,
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
    this.formlyModel = { ...this.config?.data?.rowData };
  }
  override getLookupsData(): void {
    this._apiService
      .get(API_Config.general.getJurisdictionLookup)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          if (res && res.isSuccess) {
            this.lookupsData = res['result'];
            this.initForm();
          }
        },
      });
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
      ? API_Config.judicature.update
      : API_Config.judicature.create;

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
              this.dialogRef.close(dialog);
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
