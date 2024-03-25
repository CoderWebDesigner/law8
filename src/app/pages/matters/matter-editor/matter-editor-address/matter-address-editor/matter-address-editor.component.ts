import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { ClientService } from '@shared/services/client.service';
import { MatterService } from '@shared/services/matter/matter.service';
import { SharedModule } from '@shared/shared.module';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-matter-address-editor',
  templateUrl: './matter-address-editor.component.html',
  styleUrls: ['./matter-address-editor.component.scss'],
  standalone: true,
  imports: [FormlyConfigModule, SharedModule],
})
export class MatterAddressEditorComponent
  extends FormBaseClass
  implements OnInit
{
  generalApiUrls = API_Config.general;
  apiUrls = API_Config.matterAddress;
  _matterService = inject(MatterService);
  address: any[]=[];
  ngOnInit(): void {
    console.log('address ngOnInit',this.address)
    this.getLookupsData();
    if (this._dynamicDialogConfig?.data?.rowData) this.getData();
  }
  override getData(): void {
    this.formlyModel = { ...this._dynamicDialogConfig?.data?.rowData };
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

  override onSubmit(): void {
    if (this.formly.invalid) return;
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
    if (this._dynamicDialogConfig?.data?.isDynamic) {
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
    } else {
      // this.data=this.data.map(obj=>{
      //   console.log('obj1',obj)
      //   console.log('obj2',this._dynamicDialogConfig?.data?.rowData)
      //   console.log('comparsion',JSON.stringify(obj)==JSON.stringify(this._dynamicDialogConfig?.data?.rowData))
      //   return obj
      // })
      // let index =this.data.findIndex(obj=>{
      //   debugger
      //   console.log('obj1',obj)
      //   console.log('obj2',this._dynamicDialogConfig?.data?.rowData)
      //   console.log('comparsion',JSON.stringify(obj)==JSON.stringify(this._dynamicDialogConfig?.data?.rowData))
      //   return JSON.stringify(obj)==JSON.stringify(this._dynamicDialogConfig?.data?.rowData)
      // })
      // console.log('index',index)
      // if(index!=-1){
      //   this.data[index]=this.formlyModel
      // }else{
      //   this.data.push(this.formlyModel)
      //   this._matterService.address$.next(this.formlyModel);
      // }

      this.address.push(this.formlyModel);
      this._matterService.address$.next(this.formlyModel);
      console.log('address', this.address);

      this._DialogService.dialogComponentRefMap.forEach((dialog) => {
        dialog.destroy();
      });
    }
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
}
