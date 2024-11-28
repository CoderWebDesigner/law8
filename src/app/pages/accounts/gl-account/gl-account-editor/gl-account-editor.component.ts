import { Component, OnInit } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';
import { combineLatest, finalize } from 'rxjs';

@Component({
  selector: 'app-gl-account-editor',
  templateUrl: './gl-account-editor.component.html',
  styleUrls: ['./gl-account-editor.component.scss'],
  standalone: true,
  imports: [FormlyConfigModule, SharedModule],
})
export class GlAccountEditorComponent extends FormBaseClass implements OnInit {
  rowData: any;
  ngOnInit(): void {
    this.getLookupsData();
    if (this._dynamicDialogConfig.data) {
      this.rowData = this._dynamicDialogConfig.data.rowData;
      this.formlyModel = this.rowData;
    }
  }
  override getLookupsData(): void {
    combineLatest({
      glType: this._apiService.get(
        API_Config.general.getGlAccountsTypeLookup
      ),
      department: this._apiService.get(API_Config.general.getDepartmentLookup),
    })
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: any) => {
          console.log('getLookupsData', res);
          this.lookupsData = res;
          this.initForm();
        },
      });
  }

  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'nickName',
            type: 'input',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('nickName'),
            },
          },
          {
            key: 'typeId',
            type: 'select',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('type'),
              options: this.lookupsData.glType.result.map((obj) => ({
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
              label: this._languageService.getTransValue(
                'bankAccount.accountName'
              ),
            },
          },

          {
            key: 'departmentId',
            type: 'select',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('department'),
              options: this.lookupsData.department.result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },
          {
            key: 'category',
            type: 'input',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('category'),
            },
          },
          {
            key: 'costCenter',
            type: 'input',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('Cost Center'),
            },
          },
          {
            key: 'control',
            type: 'input',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('control'),
            },
          },
          {
            key: 'subAccOf',
            type: 'input',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('subAccOf'),
            },
          },
        ],
      },
    ];
  }

  override onSubmit(): void {
    if (this.formly.invalid) {
      const text = this._languageService.getTransValue(
        'messages.checkDataValidation'
      );
      this._toastrNotifiService.displayErrorToastr(text);
      this.formly.markAllAsTouched();
      return;
    }

    const successMsgKey = this.rowData
      ? 'messages.updateSuccessfully'
      : 'messages.createdSuccessfully';

    const path = this.rowData
      ? API_Config.glAccount.update
      : API_Config.glAccount.create;

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
            this._dynamicDialogRef.close(true);
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
