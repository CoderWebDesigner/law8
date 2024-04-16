import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';

import { finalize } from 'rxjs';
import { MatterService } from '@components/matters/service/matter.service';

@Component({
  selector: 'app-matter-party-editor',
  standalone: true,
  imports: [CommonModule, FormlyConfigModule, SharedModule],
  templateUrl: './matter-party-editor.component.html',
  styleUrls: ['./matter-party-editor.component.scss'],
})
export class MatterPartyEditorComponent
  extends FormBaseClass
  implements OnInit
{
  generalApiUrls = API_Config.general;
  apiUrls = API_Config.matterParties;
  _matterService = inject(MatterService);
  data: any[] = [];
  ngOnInit(): void {
    this.getLookupsData();
    this.getList();
    if (this._dynamicDialogConfig?.data?.rowData) this.getData();
  }
  getList() {
    this._matterService.partyList$
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
    this._apiService.get(API_Config.general.getPartiesDescription)
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
            key: 'partyTypeId',
            type: 'select',
            props: {
              label: this._languageService.getTransValue('matters.partyType'),
              // required: true,
              options: [
                { label: 'Opponent', value: 1 },
                { label: 'Others', value: 2 },
                { label: 'Expert', value: 3 },
                { label: 'Judge', value: 4 },
                { label: 'Client', value: 5 },
              ],
            },
          },
          {
            className: 'col-md-6',
            key: 'name',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('matters.partyName'),
              // required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'law_PartiesDescriptionId',
            type: 'select',
            props: {
              label: this._languageService.getTransValue('matters.party'),
              // required: true,
              options: this.lookupsData.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },
          {
            className: 'col-md-6',
            key: 'position',
            type: 'select',
            props: {
              label: this._languageService.getTransValue('matters.position'),
              // required: true,
              options: [{ label: '1', value: 1 }],
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
      this._matterService.partyList$.next(this.data);
      this._DialogService.dialogComponentRefMap.forEach((dialog) => {
        dialog.destroy();
      });
    }
  }
}
