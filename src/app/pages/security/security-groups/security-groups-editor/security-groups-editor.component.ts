import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedService } from '@shared/services/shared.service';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-security-groups-editor',
  templateUrl: './security-groups-editor.component.html',
  styleUrls: ['./security-groups-editor.component.scss'],
  standalone:true,
  imports:[SharedModule, FormlyConfigModule],
})
export class SecurityGroupsEditorComponent extends FormBaseClass implements OnInit{
  _sharedService = inject(SharedService);
  ngOnInit(): void {
    if (this._dynamicDialogConfig?.data?.rowData) this.getData();
    this.initForm()
  }

  override initForm(): void {
    this.formlyFields = [
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
    ];
  }
  override getData(): void {
    this.formlyModel = { ...this._dynamicDialogConfig?.data?.rowData };
  }
  override onSubmit(): void {
    // if (this.formly.invalid) return;

    // console.log(this.formlyModel);
    // const successMsgKey = this._dynamicDialogConfig?.data?.rowData
    //   ? 'messages.updateSuccessfully'
    //   : 'messages.createdSuccessfully';
    // const requestPayload = this._dynamicDialogConfig?.data?.rowData
    //   ? { ...this.formlyModel, id: this._dynamicDialogConfig?.data?.rowData?.id }
    //   : this.formlyModel;
    // const path = this._dynamicDialogConfig?.data?.rowData
    //   ? API__dynamicDialogConfig.judicature.update
    //   : API__dynamicDialogConfig.judicature.create;

    // this._apiService
    //   .post(path, requestPayload)
    //   .pipe(
    //     finalize(() => (this.isSubmit = false)),
    //     this.takeUntilDestroy()
    //   )
    //   .subscribe({
    //     next: (res: ApiRes) => {
    //       if (res && res.isSuccess) {
    //         const text = this._languageService.getTransValue(successMsgKey);
    //         this._toastrNotifiService.displaySuccessMessage(text);
    //         this._DialogService.dialogComponentRefMap.forEach((dialog) => {
    //           this.dialogRef.close(dialog);
    //         });
    //       } else {
    //         this._toastrNotifiService.displayErrorToastr(res?.message);
    //       }
    //     },
    //     error: (err: any) => {
    //       this._toastrNotifiService.displayErrorToastr(err?.error?.message);
    //     },
    //   });
  }

}
