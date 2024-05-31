import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { GLOBAL_DATE_TIME_FORMATE, GLOBAL_DATE_TIME_Without_Seconds_FORMATE } from '@core/utilities/defines';
import { FormlyFieldConfig } from '@ngx-formly/core';

import { forkJoin, finalize } from 'rxjs';

@Component({
  selector: 'app-task-management-editor',
  templateUrl: './task-management-editor.component.html',
  styleUrls: ['./task-management-editor.component.scss'],
  providers:[DatePipe]
})
export class TaskManagementEditorComponent
  extends FormBaseClass
  implements OnInit, OnDestroy
{
  generalApiUrls = API_Config.general;
  apiUrls = API_Config.matterActivity;
  requestId: number;
  minDate = new Date();
  _datePipe=inject(DatePipe)
  ngOnInit(): void {
    this.getLookupsData();
    this.getParms()
  }
  getParms(){
    this._route.params.pipe(this._sharedService.takeUntilDistroy()).subscribe({
      next: (res) => {
        this.requestId=res['id']
        if(this.requestId) this.getData()
      },
    });
  }
  override getData(): void {
  
    this._apiService
      .get(`${this.apiUrls.getById}?id=${this.requestId}`)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          console.log(res);
          this.formlyModel = { ...res['result'] };
         
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
      this._apiService.get(this.generalApiUrls.getMatterCodes),
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
            type: 'select',
            key: 'law_MatterId',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('common.matterCode'),
              options: this.lookupsData[5].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
              // disabled: true,
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
              //required: true,
              options: this.lookupsData[0].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },

          {
            className: 'col-md-4',
            key: 'startDate',
            defaultValue:new Date(),
            type: 'date',
            props: {
              label: this._languageService.getTransValue('matters.startDate'),
              //required: true,
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
            defaultValue: !this.requestId
            ? 1
            : '',
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
                return ![4, 7].includes(field.model?.law_ActivityTypeId);
              },
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
                return ![2,3, 5, 6, 8, 4, 7].includes(
                  field.model?.law_ActivityTypeId
                );
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
                return ![2,3, 5, 4].includes(
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
                    return !this.requestId;
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
                    return !this.requestId;
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
                  // type: 'number',
                  pKeyFilter: 'int',
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
                    return !this.requestId;
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
                defaultValue:new Date(),
                type: 'date',
                props: {
                  label:
                    this._languageService.getTransValue('matters.startDate'),
                  //required: true,
                  showTime: true,
                },
              },

              {
                className: 'col-md-4',
                key: 'law_ActivityStatusId',
                type: 'select',
                defaultValue: !this.requestId
                ? 1
                : '',
                props: {
                  label: this._languageService.getTransValue('matters.status'),
                  //required: true,
                  options: this.lookupsData[3].result.map((obj) => ({
                    label: obj.name,
                    value: obj.id,
                  })),
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
            expressions: {
              hide: () => {
                return !this.formly.get('law_AdjournmentReasonsId')?.value;
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
                key: 'comments',
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
                  pKeyFilter: 'int',
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
                  //required: true,
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
                },
              },
            ],
          },
          {
            fieldGroupClassName: 'row form-section py-3',
            fieldGroup: [
              {
                className: 'col-md-4',
                key: 'finalJudgement',
                type: 'checkbox',
                props: {
                  label: this._languageService.getTransValue(
                    'matters.finalJudgement'
                  ),
                  //required: true,
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
                  this.requestId
                );
              },
            },
          },
        ],
      },
    ];
  }
 
  override onSubmit(): void {
    if (this.formly.invalid) return;
    this.formlyModel.startDate = this.getDate(this.formlyModel?.startDate);
    if (this.formlyModel.endDate)
      this.formlyModel.endDate = this.getDate(this.formlyModel?.endDate);
    if (this.formlyModel?.newSession?.startDate)
      this.formlyModel.newSession.startDate = this.getDate(this.formlyModel?.newSession?.startDate);
    const successMsgKey = this.requestId
      ? 'messages.updateSuccessfully'
      : 'messages.createdSuccessfully';
    const requestPayload = this.requestId
      ? {
          ...this.formlyModel,
          litigatorId: this.formlyModel?.litigatorId?.toString(),
        }
      : {
          ...this.formlyModel,
          litigatorId: this.formlyModel?.litigatorId?.toString(),
        };

    const path = this.requestId
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
           this._router.navigate(['/task-management'])
          } else {
            this._toastrNotifiService.displayErrorToastr(res?.message);
          }
        },
        error: (err: any) => {
          this._toastrNotifiService.displayErrorToastr(err?.error?.message);
        },
      });
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
