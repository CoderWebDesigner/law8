import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';

import { finalize, forkJoin } from 'rxjs';
import { MatterService } from '@components/matters/service/matter.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Params } from '@angular/router';

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
    console.log(' this.formlyModel', this.formlyModel);
  }
  override getLookupsData(): void {
    forkJoin([
      this._apiService.get(API_Config.general.getPartiesDescription),
      this._apiService.get(API_Config.general.getPartyTypes),
    ])
      .pipe(
        finalize(() => (this.isSubmit = false)),
        this.takeUntilDestroy()
      )
      .subscribe({
        next: (res: ApiRes) => {
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
            className: 'col-md-6',
            key: 'partyTypeId',
            type: 'select',
            props: {
              label: this._languageService.getTransValue('matters.partyType'),
              required: true,
              options: this.lookupsData[1]?.result?.map((obj) => ({
                label: obj.name,
                value: +obj.id,
              })),
              onChange:(e)=>{
                this.formly.get('partyType').setValue(e?.originalEvent.target.innerText)
              }    
            },
          },
          {
            key: 'partyType',
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
              options: this.lookupsData[0].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
              onChange: (e) => {
                this.formly
                  .get('law_PartiesDescription')
                  .setValue(e?.originalEvent.target.innerText);
              },
            },
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return field.model?.partyTypeId == 6 || field.model?.partyTypeId == 7;
              },
            },
          },
          {
            key: 'law_PartiesDescription',
          },
          {
            className: 'col-md-6',
            key: 'position',
            type: 'select',
            props: {
              label: this._languageService.getTransValue('matters.position'),
              // required: true,
            },
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return field.model?.partyTypeId == 6 || field.model?.partyTypeId == 7;
              },
            },
            hooks: {
              onInit: (field: FormlyFieldConfig) => {
                // console.log('field');
                this.formly
                  .get('law_PartiesDescriptionId')
                  .valueChanges.subscribe({
                    next: (res) => {
                      if (res) {
                        this._apiService
                          .get(API_Config.general.getPartyPosition, {
                            Law_MatterId:
                              this._dynamicDialogConfig?.data?.law_MatterId,
                            Law_PartiesDescriptionId: res,
                          })
                          .subscribe({
                            next: (res: ApiRes) => {
                              field.props.options = res.result.map((obj) => ({
                                label: obj.name,
                                value: obj.id,
                              }));
                            },
                          });
                      }
                    },
                  });
                if (this.formlyModel?.law_PartiesDescriptionId) {
                  this._apiService
                    .get(API_Config.general.getPartyPosition, {
                      Law_MatterId:
                        this._dynamicDialogConfig?.data?.law_MatterId,
                      Law_PartiesDescriptionId:
                        this.formlyModel?.law_PartiesDescriptionId,
                    })
                    .subscribe({
                      next: (res: ApiRes) => {
                        field.props.options = res.result.map((obj) => ({
                          label: obj.name,
                          value: obj.id,
                        }));
                        this.formlyOption.build();
                      },
                    });
                }
              },
            },
          },
        ],
      },
    ];
  }
  save(closeModal:boolean=false) {
    const successMsgKey = this._dynamicDialogConfig?.data?.rowData
      ? 'messages.updateSuccessfully'
      : 'messages.createdSuccessfully';
    const requestPayload = this._dynamicDialogConfig?.data?.rowData
      ? {
          ...this.formlyModel,
          id: this._dynamicDialogConfig?.data?.rowData?.id,
        }
      : {
          ...this.formlyModel,
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
            this.formlyModel={}
            if(closeModal){
              this._DialogService.dialogComponentRefMap.forEach((dialog) => {
                this._dynamicDialogRef.close(dialog);
              });
            }
            // this._DialogService.dialogComponentRefMap.forEach((dialog) => {
            //   this._dynamicDialogRef.close(dialog);
            // });
          } else {
            this._toastrNotifiService.displayErrorToastr(res?.message);
          }
        },
        error: (err: any) => {
          this._toastrNotifiService.displayErrorToastr(err?.error?.message);
        },
      });
  }
  override onSubmit(closeModal:boolean=false): void {
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
      console.log(this.data)
      this._matterService.partyList$.next(this.data);
      this.formlyModel={}
      if(closeModal){
        this._DialogService.dialogComponentRefMap.forEach((dialog) => {
          dialog.destroy();
        });
      }
    }
  }
}
