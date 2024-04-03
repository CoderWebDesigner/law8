import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBaseClass } from '@core/classes/form-base.class';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiRes } from '@core/models';
import { finalize } from 'rxjs';
import { MatterService } from '@components/matters/service/matter.service';

@Component({
  selector: 'app-matter-address-editor',
  standalone: true,
  imports: [CommonModule, FormlyConfigModule, SharedModule],
  templateUrl: './matter-address-editor.component.html',
  styleUrls: ['./matter-address-editor.component.scss'],
})
export class MatterAddressEditorComponent
  extends FormBaseClass
  implements OnInit
{
  generalApiUrls = API_Config.general;
  apiUrls = API_Config.matterAddress;
  _addressService = inject(MatterService);
  data: any[] = [];
  ngOnInit(): void {
    this.getLookupsData();
    this.getList();
    if (this._dynamicDialogConfig?.data?.rowData) this.getData();
  }
  getList() {
    this._addressService.addressList$
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: any[]) => {
          this.data = res;
        },
      });
  }
  override getData(): void {
    this.formlyModel = { ...this._dynamicDialogConfig?.data?.rowData };
  }
  override getLookupsData(): void {
    this._apiService
      .get(this.generalApiUrls.getCountryLookup)
      .pipe(
        finalize(() => (this.isSubmit = false)),
        this.takeUntilDestroy()
      )
      .subscribe({
        next: (res: ApiRes) => {
          this.lookupsData = res.result;
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
            className: 'col-md-6',
            key: 'line1',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.line1'),
              placeholder: this._languageService.getTransValue(
                'client.linePlaceholder'
              ),
              // required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'line2',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.line2'),
              placeholder: this._languageService.getTransValue(
                'client.linePlaceholder'
              ),
              // required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'streetNumber',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.streetNumber'),
              placeholder: this._languageService.getTransValue(
                'client.streetNumberPlaceholder'
              ),
              type: 'number',
              // required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'city',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.city'),
              placeholder: this._languageService.getTransValue(
                'client.cityPlaceholder'
              ),
              // required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'countryId',
            type: 'select',
            props: {
              label: this._languageService.getTransValue('client.country'),
              placeholder: this._languageService.getTransValue(
                'client.countryPlaceholder'
              ),
              options: this.lookupsData.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),

              // required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'state',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.state'),
              placeholder: this._languageService.getTransValue(
                'client.statePlaceholder'
              ),
              // options: ,
              // required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'zipCode',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.zipCode'),
              placeholder: this._languageService.getTransValue(
                'client.zipCodePlaceholder'
              ),
              // required: true,
            },
          },
        ],
      },
    ];
  }
  save() {
    const successMsgKey = this._dynamicDialogConfig?.data?.rowData
      ? 'messages.updateSuccessfully'
      : 'messages.createdSuccessfully';
    const requestPayload = this._dynamicDialogConfig?.data?.rowData
      ? {
          ...this.formlyModel,
          streetNumber: +this.formlyModel.streetNumber,
          id: this._dynamicDialogConfig?.data?.rowData?.id,
        }
      : {
          ...this.formlyModel,
          streetNumber: +this.formlyModel.streetNumber,
          law_MatterId: this._dynamicDialogConfig?.data?.law_MatterId,
        };
    const path = this._dynamicDialogConfig?.data?.rowData
      ? this.apiUrls.update
      : this.apiUrls.create;
    this._apiService
      .post(path, requestPayload)
      .pipe(this._sharedService.takeUntilDistroy())
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
  override onSubmit(): void {
    if (this.formly.invalid) return;
    if (this._dynamicDialogConfig?.data?.isDynamic) {
      this.save();
    } else {
      let index = this.data.findIndex(
        (obj) => obj?.key == this._dynamicDialogConfig?.data?.rowData?.key
      );
      if (index != -1) {
        this.data[index] = this.formlyModel;
      } else {
        this.data.push(this.formlyModel);
      }
      this.data = this.data.map((obj) => {
        if (!obj.hasOwnProperty('key')) {
          obj.key = Math.random().toString(36).substring(2, 9);
        }
        return obj;
      });
      this._addressService.addressList$.next(this.data);
      this._DialogService.dialogComponentRefMap.forEach((dialog) => {
        dialog.destroy();
      });
    }
  }
}
