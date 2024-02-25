import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedService } from '@shared/services/shared.service';
import { SharedModule } from '@shared/shared.module';
import { ButtonModule } from 'primeng/button';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-lookups-sup-rate',
  standalone: true,
  imports: [CommonModule, SharedModule, ButtonModule, FormlyConfigModule],
  templateUrl: './lookups-sup-rate.component.html',
  styleUrls: ['./lookups-sup-rate.component.scss']
})
export class LookupsSupRateComponent extends FormBaseClass
implements OnInit
{
title: string;

config = inject(DynamicDialogConfig);
dialogRef = inject(DynamicDialogRef);
_sharedService = inject(SharedService);
ngOnInit(): void {
  if (this.config?.data?.rowData) this.getData();
  this.getLookupsData()
 
}

override initForm(): void {
  console.log(this.config.data);
  this.formlyFields = [
    // {
    //   key: 'mainItem',
    //   type: 'select',
    //   // hide:,
    //   props: {
    //     // required: true,
    //     label: this._languageService.getTransValue('lookups.mainCategory'),
    //       label:
    //         this._languageService.getSelectedLanguage() == 'ar'
    //           ? obj.nameAR
    //           : obj.nameEN,
    //       value: 1,
    //   },
    // },
    {
      key: 'name',
      type: 'input',
      props: {
        label: this._languageService.getTransValue('lookups.rateName'),
        required: true,
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
    ? API_Config.rate.update
    : API_Config.rate.create;

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