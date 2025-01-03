import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { GLOBAL_DATE_TIME_Without_Seconds_FORMATE } from '@core/utilities/defines';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';

import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-matter-details-activity-editor',
  templateUrl: './matter-details-activity-editor.component.html',
  styleUrls: ['./matter-details-activity-editor.component.scss'],
  standalone: true,
  providers: [DatePipe],
  imports: [CommonModule, FormlyConfigModule, SharedModule],
})
export class MatterDetailsActivityEditorComponent
  extends FormBaseClass
  implements OnInit, OnDestroy
{
  _datePipe = inject(DatePipe);
  generalApiUrls = API_Config.general;
  apiUrls = API_Config.matterActivity;
  minDate = new Date();
  data:any;
  ngOnInit(): void {
    if (!this._dynamicDialogConfig?.data?.rowData)
      this.getMatterCodeByMatterId();
    if (this._dynamicDialogConfig?.data?.rowData) {
      this.getLookupsData();
      this.getData();
    }
  }

  getMatterCodeByMatterId() {
    let matterId = this._dynamicDialogConfig?.data?.law_MatterId;
    this._apiService
      .get(`${API_Config.matters.getMatterCodeByMatterId}?id=${matterId}`)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          this.formlyModel.mtrNo = res['result'].name;
          this.getLookupsData();
        },
      });
  }
  override getData(): void {
    let id = this._dynamicDialogConfig?.data?.rowData?.id;
    this._apiService
      .get(`${this.apiUrls.getById}?id=${id}`)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          console.log(res);
          this.data=res['result']
          this.formlyModel = { ...this.data };
          this.formlyModel.startDate = this._datePipe.transform(
            this.formlyModel?.startDate,
            GLOBAL_DATE_TIME_Without_Seconds_FORMATE
          );
          this.formlyModel.endDate = this._datePipe.transform(
            this.formlyModel?.endDate,
            GLOBAL_DATE_TIME_Without_Seconds_FORMATE
          );
          if (this.formlyModel?.newSession?.startDate)
            this.formlyModel.newSession.startDate = this._datePipe.transform(
              this.formlyModel?.newSession?.startDate,
              GLOBAL_DATE_TIME_Without_Seconds_FORMATE
            );
        },
      });
  }
  override getLookupsData(): void {
    forkJoin([
      this._apiService.get(this.generalApiUrls.getActivityType),
      this._apiService.get(this.generalApiUrls.getFinalJudgement),
      this._apiService.get(API_Config.responsibleLawyerSecurity.get),
      this._apiService.get(this.generalApiUrls.getActivityStatus),
      this._apiService.get(this.generalApiUrls.getAdjournmentReasons),
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
            // type: 'input',
            key: 'law_MatterId',
            defaultValue: this._dynamicDialogConfig.data.law_MatterId,
          },
          {
            type: 'input',
            key: 'mtrNo',
            className: 'col-md-4',
            defaultValue: this._dynamicDialogConfig.data.matterCode,
            props: {
              label: this._languageService.getTransValue('common.matterCode'),
              disabled: true,
            },
          },
          {
            className: 'col-md-4',
            key: 'law_ActivityTypeId',
            type: 'select',
            defaultValue: 1,
            props: {
              label: this._languageService.getTransValue(
                'matters.activityType'
              ),
              required: true,
              options: this.lookupsData[0].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },

          {
            className: 'col-md-4',
            key: 'startDate',
            type: 'date',
            defaultValue:new Date(),
            props: {
              label: this._languageService.getTransValue('matters.startDate'),
              required: true,
              showTime: true,

            },
            
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return ![2, 3, 5, 6, 8, 4, 7].includes(
                  field.model?.law_ActivityTypeId
                );
              },
            },
          },
          {
            className: 'col-md-4',
            key: 'endDate',
            type: 'date',
            props: {
              label: this._languageService.getTransValue('matters.endDate'),
              //required: true,
              showTime: true,
            },
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return ![4].includes(field.model?.law_ActivityTypeId);
              },
              'props.required': '[4].includes(field.model?.law_ActivityTypeId)',
            },
          },
          // {
          //   className: 'col-md-4',
          //   key: 'duration',
          //   type: 'input',
          //   props: {
          //     label: this._languageService.getTransValue('matters.duration'),
          //     //required: true,
          //     showTime: true,
          //   },
          //   expressions: {
          //     hide: (field: FormlyFieldConfig) => {
          //       return ![4].includes(field.model?.law_ActivityTypeId);
          //     },
          //   },
          // },
          {
            className: 'col-md-4',
            key: 'location',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('matters.location'),
              //required: true,
              showTime: true,
            },
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return ![4].includes(field.model?.law_ActivityTypeId);
              },
            },
          },
          {
            className: 'col-md-4',
            key: 'law_ActivityStatusId',
            type: 'select',
            defaultValue: !this._dynamicDialogConfig?.data?.rowData ? 1 : '',
            props: {
              label: this._languageService.getTransValue('matters.status'),
              //required: true,
              options: this.lookupsData[3].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return ![2,4,5, 7].includes(field.model?.law_ActivityTypeId);
              },
              'props.required': '[1,4, 7].includes(field.model?.law_ActivityTypeId)',
            },
          },
          {
            className: 'col-12',
            key: 'description',
            type: 'textarea',
            props: {
              label: this._languageService.getTransValue('common.description'),
              //required: true,
            },
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return ![2, 3, 5, 6, 8, 4, 7].includes(
                  field.model?.law_ActivityTypeId
                );
              },
              'props.required': '[2, 3, 5, 6, 8, 4, 7].includes(field.model?.law_ActivityTypeId)',
            },
          },

          {
            className: 'col-12',
            key: 'remark',
            type: 'textarea',
            props: {
              label: this._languageService.getTransValue('matters.remark'),
              //required: true,
            },
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return [1].includes(field.model?.law_ActivityTypeId);
              },
            },
          },
          {
            key: 'isPrivate',
            type: 'switch',
            defaultValue: false,
            props: {
              label: this._languageService.getTransValue('matters.isPrivate'),
              class: 'd-block',
            },
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return ![2,3, 5, 6, 8, 4, 7].includes(
                  field.model?.law_ActivityTypeId
                );
              },
            },
          },
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-12',
                template: `<h5 class="my-4 line-title overflow-hidden"> <span class="me-3">${this._languageService.getTransValue(
                  'matters.hearingSession'
                )}</span></h5>`,
              },
              {
                className: 'col-12',
                key: 'description',
                type: 'textarea',
                props: {
                  label:
                    this._languageService.getTransValue('matters.comments'),
                  //required: true,
                },
              },
              {
                className: 'col-12',
                key: 'report',
                type: 'textarea',
                props: {
                  label: this._languageService.getTransValue('matters.report'),
                  //required: true,
                },
                expressions: {
                  hide: () => {
                    return !this._dynamicDialogConfig.data.rowData;
                  },
                },
              },
              {
                className: 'col-12',
                key: 'decission',
                type: 'textarea',
                props: {
                  label:
                    this._languageService.getTransValue('matters.decision'),
                  //required: true,
                },
                expressions: {
                  hide: () => {
                    return !this._dynamicDialogConfig.data.rowData;
                  },
                },
              },
              {
                className: 'col-12',
                key: 'remark',
                type: 'textarea',
                props: {
                  label: this._languageService.getTransValue('matters.remark'),
                  //required: true,
                },
                expressions: {
                  hide: (field: FormlyFieldConfig) => {
                    return ![1].includes(field.model?.law_ActivityTypeId);
                  },
                },
              },

              {
                className: 'col-md-4',
                key: 'chamber',
                type: 'input',
                props: {
                  label: this._languageService.getTransValue('matters.chamber'),
                  //required: true,
                },
              },
              {
                className: 'col-md-4',
                key: 'rollNumber',
                type: 'input',
                props: {
                  label:
                    this._languageService.getTransValue('matters.rollNumber'),
                  // pKeyFilter: 'int',
                  //required: true,
                },
              },
              {
                className: 'col-md-4',
                key: 'law_AdjournmentReasonsId',
                type: 'select',
                props: {
                  label: this._languageService.getTransValue(
                    'matters.adjournmentReason'
                  ),
                  //required: true,
                  options: this.lookupsData[4].result.map((obj) => ({
                    label: obj.name,
                    value: obj.id,
                  })),
                  onChange: (field: FormlyFieldConfig) => {
                    console.log('change');
                    this.formly.get('law_ActivityStatusId').setValue(4);
                  },
                },
                expressions: {
                  hide: () => {
                    return !this._dynamicDialogConfig.data.rowData;
                  },
                },
              },
              {
                className: 'col-md-4',
                key: 'litigatorId',
                type: 'select',
                props: {
                  label:
                    this._languageService.getTransValue('matters.litigator'),
                  //required: true,
                  options: this.lookupsData[2].result.map((obj) => ({
                    label: obj.name,
                    value: obj.id,
                  })),
                },
              },

              {
                className: 'col-md-4',
                key: 'startDate',
                type: 'date',
                defaultValue:new Date(),
                props: {
                  label:
                    this._languageService.getTransValue('matters.startDate'),
                  required: true,
                  showTime: true,
                  minDate: this.minDate,

                },
              },

              {
                className: 'col-md-4',
                key: 'law_ActivityStatusId',
                defaultValue: !this._dynamicDialogConfig?.data?.rowData
                  ? 1
                  : '',
                type: 'select',
                props: {
                  label: this._languageService.getTransValue('matters.status'),
                  //required: true,
                  options: this.lookupsData[3].result.map((obj) => ({
                    label: obj.name,
                    value: obj.id,
                  })),
                },
                expressions: {
                  'props.required': '[1,4, 7].includes(field.model?.law_ActivityTypeId)',
                },
              },
            ],
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return (
                  field.model?.law_ActivityTypeId != 1 ||
                  !field.model?.law_ActivityTypeId
                );
              },
            },
          },
          {
            fieldGroupClassName: 'form-section row mb-3',
            key: 'newSession',
            // expressions: {
            //   hide: () => {
            //     return !this.formly.get('law_AdjournmentReasonsId')?.value || this.data?.law_AdjournmentReasonsId;
            //   },
            // },
            expressions: {
              hide: () => {
                return !this.formly.get('law_AdjournmentReasonsId')?.value || !!this.data?.law_AdjournmentReasonsId;
              },
              onInit: (field) => {
                const startDateControl = field.formControl.get('startDate');
                if (startDateControl && !startDateControl.value) {
                  startDateControl.setValue(new Date());
                }
                const statusControl = field.formControl.get('law_ActivityStatusId');
                if (statusControl && !statusControl.value) {
                  statusControl.setValue(1);
                }
              },
            },
            fieldGroup: [
              {
                className: 'col-12',
                template: `<h5 class="my-4 line-title overflow-hidden"> <span class="me-3">${this._languageService.getTransValue(
                  'matters.newHearingSession'
                )}</span></h5>`,
              },
              {
                className: 'col-12',
                // key: 'comments',
                key: 'description',
                type: 'textarea',
                props: {
                  label:
                    this._languageService.getTransValue('matters.comments'),
                  //required: true,
                },
              },
              {
                className: 'col-12',
                key: 'remark',
                type: 'textarea',
                props: {
                  label: this._languageService.getTransValue('matters.remark'),
                  //required: true,
                },
              },

              {
                className: 'col-md-4',
                key: 'chamber',
                type: 'input',
                props: {
                  label: this._languageService.getTransValue('matters.chamber'),
                  //required: true,
                },
              },
              {
                className: 'col-md-4',
                key: 'rollNumber',
                type: 'input',
                props: {
                  label:
                    this._languageService.getTransValue('matters.rollNumber'),
                  // type: 'number',
                  // pKeyFilter: 'int',
                  //required: true,
                },
              },
              {
                className: 'col-md-4',
                key: 'startDate',
                type: 'date',
                defaultValue:new Date(),
                props: {
                  label:
                    this._languageService.getTransValue('matters.startDate'),
                  required: true,
                  showTime: true,
                  minDate: this.minDate,
                },
              },

              {
                className: 'col-md-4',
                key: 'law_ActivityStatusId',
                type: 'select',
                defaultValue: 1,
                props: {
                  label: this._languageService.getTransValue('matters.status'),
                  //required: true,
                  options: this.lookupsData[3].result.map((obj) => ({
                    label: obj.name,
                    value: obj.id,
                  })),
                }
                
              },
            ],
          },
          {
            fieldGroupClassName: 'row form-section py-3',
            fieldGroup: [
              // {
              //   className: 'col-md-4',
              //   key: 'finalJudgement',
              //   type: 'checkbox',
              //   props: {
              //     label: this._languageService.getTransValue(
              //       'matters.finalJudgement'
              //     ),
              //     //required: true,
              //   },
              // },
              {
                type: 'checkbox',
                key: 'finalJudgement',
                className: 'col-md-4 d-flex align-items-center',
                props:{
                  label:null,
                  value:this._languageService.getTransValue('matters.finalJudgement'),
                },

              },
              {
                className: 'col-md-4',
                key: 'law_FinalJudgementId',
                type: 'select',
                props: {
                  label: this._languageService.getTransValue(
                    'matters.finalJudgement'
                  ),
                  //required: true,
                  options: this.lookupsData[1].result.map((obj) => ({
                    label: obj.name,
                    value: obj.id,
                  })),
                },
                expressions: {
                  hide: (field: FormlyFieldConfig) => {
                    return !field.model?.finalJudgement;
                  },
                },
              },
              {
                className: 'col-md-4',
                key: 'cassation_Or_AppealPeriod',
                type: 'input',
                props: {
                  label: this._languageService.getTransValue(
                    'matters.cassationOrAppealPeriod'
                  ),
                  // type: 'number',
                  pKeyFilter: 'int',
                  //required: true,
                },
                expressions: {
                  hide: (field: FormlyFieldConfig) => {
                    return !field.model?.finalJudgement;
                  },
                },
              },
            ],
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return !(
                  [1].includes(field.model?.law_ActivityTypeId) &&
                  this._dynamicDialogConfig.data.rowData
                );
              },
            },
          },
        ],
      },
    ];
  }
  save() {
    this.formlyModel.startDate = this.getDate(this.formlyModel?.startDate);
    if (this.formlyModel.endDate)
      this.formlyModel.endDate = this.getDate(this.formlyModel?.endDate);
    if (this.formlyModel?.newSession?.startDate)
      this.formlyModel.newSession.startDate = this.getDate(this.formlyModel?.newSession?.startDate);
    const successMsgKey = this._dynamicDialogConfig?.data?.rowData
      ? 'messages.updateSuccessfully'
      : 'messages.createdSuccessfully';
    const requestPayload = this._dynamicDialogConfig?.data?.rowData
      ? {
          ...this.formlyModel,
          litigatorId: this.formlyModel?.litigatorId?.toString(),
          id: this._dynamicDialogConfig?.data?.rowData?.id,
        }
      : {
          ...this.formlyModel,
          litigatorId: this.formlyModel?.litigatorId?.toString(),
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
    }
  }
  getDate(date: Date) {
    let dateFrom = new Date(date);
    let dateValue = new Date(
      Date.UTC(
        dateFrom.getFullYear(),
        dateFrom.getMonth(),
        dateFrom.getDate(),
        dateFrom.getHours(),
        dateFrom.getMinutes()
      )
    );
    return dateValue;
  }
}
