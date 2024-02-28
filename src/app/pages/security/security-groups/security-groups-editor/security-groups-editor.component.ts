import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedService } from '@shared/services/shared.service';
import { SharedModule } from '@shared/shared.module';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-security-groups-editor',
  templateUrl: './security-groups-editor.component.html',
  styleUrls: ['./security-groups-editor.component.scss'],
  standalone:true,
  imports:[SharedModule, FormlyConfigModule],
})
export class SecurityGroupsEditorComponent extends FormBaseClass implements OnInit{
  apiUrls=API_Config.security
  ngOnInit(): void {
    if (this._dynamicDialogConfig?.data?.rowData) this.getData();
    this.initForm()
  }

  override initForm(): void {
    this.formlyFields = [
      {
        key: 'name',
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
    let id = this._dynamicDialogConfig?.data?.rowData?.id
    this._apiService.get(`${this.apiUrls.getById}?id=${id}`).pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next:(res:ApiRes)=>{
        this.formlyModel = { ...res['result'] };
      }
    })

  }
  override onSubmit(): void {
    if (this.formly.invalid) return;

    console.log(this.formlyModel);
    const successMsgKey = this._dynamicDialogConfig?.data?.rowData
      ? 'messages.updateSuccessfully'
      : 'messages.createdSuccessfully';
    const requestPayload = this._dynamicDialogConfig?.data?.rowData
      ? { ...this.formlyModel, id: this._dynamicDialogConfig?.data?.rowData?.id,descr:'test',active:true }
      :{...this.formlyModel,descr:'test',active:true} ;
    const path = this._dynamicDialogConfig?.data?.rowData
      ? this.apiUrls.update
      : this.apiUrls.create;

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
