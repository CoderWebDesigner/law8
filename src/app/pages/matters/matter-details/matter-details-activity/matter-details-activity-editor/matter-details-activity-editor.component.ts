import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatterService } from '@shared/services/matter/matter.service';
import { SharedService } from '@shared/services/shared.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-matter-details-activity-editor',
  templateUrl: './matter-details-activity-editor.component.html',
  styleUrls: ['./matter-details-activity-editor.component.scss'],
})
export class MatterDetailsActivityEditorComponent
  extends FormBaseClass
  implements OnInit, OnDestroy
{
  generalApiUrls = API_Config.general;
  apiUrls = API_Config.client;
  _matterService = inject(MatterService);
  _config = inject(DynamicDialogConfig);
  address: any[] = [];
  ngOnInit(): void {
    this.initForm();
  }

  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            type: 'input',
            key: 'matterCode',
            className: 'col-lg-3 col-md-4',
            defaultValue: this._config.data.matterId,
            props: {
              label: this._languageService.getTransValue('common.matterCode'),
              disabled: true,
            },
          },
          // {
          //   className: 'col-lg-3 col-md-4',
          //   key: 'activity',
          //   type: 'select',
          //   props: {
          //     label: this._languageService.getTransValue('matters.activity'),
          //     required: true,
          //     options: [
          //       { label: 'Phone Call', value: 'Phone Call' },
          //       { label: 'Meeting', value: 'Meeting' },
          //       { label: 'Task', value: 'Task' },
          //       { label: 'Note', value: 'Note' },
          //       { label: 'Other', value: 'Other' },
          //       { label: 'Campaign', value: 'Campaign' },
          //     ]
          //   },
          // },
          {
            className: 'col-lg-3 col-md-4',
            key: 'activityType',
            type: 'select',
            props: {
              label: this._languageService.getTransValue(
                'matters.activityType'
              ),
              required: true,
              options: [
                'Hearing Session',
                'Task',
                'Note',
                'Meeting',
                'Expert Meeting',
                'Phone Call',
                'Report',
                'Expert Meeting',
                'Judgement',
                
              ].map(item=>({label:item,value:item})),
              // [
              //   { label: 'Report', value: 'Report' },
              //   { label: 'Hearing Session', value: 'Hearing Session' },
              //   { label: 'Expert Meeting', value: 'Expert Meeting' },
              //   { label: 'General', value: 'General' },
              //   { label: 'Judgement', value: 'Judgement' },
              // ]
            },
          },
          {
            className: 'col-12',
            key: 'remark',
            type: 'textarea',
            props: {
              label: this._languageService.getTransValue('matters.remark'),
              required: true,
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
                key: 'comments',
                type: 'textarea',
                props: {
                  label:
                    this._languageService.getTransValue('matters.comments'),
                  required: true,
                },
              },
              {
                className: 'col-12',
                key: 'report',
                type: 'textarea',
                props: {
                  label: this._languageService.getTransValue('matters.report'),
                  required: true,
                },
              },
              {
                className: 'col-12',
                key: 'decision',
                type: 'textarea',
                props: {
                  label:
                    this._languageService.getTransValue('matters.decision'),
                  required: true,
                },
              },
              {
                className: 'col-lg-3 col-md-4',
                key: 'chamber',
                type: 'input',
                props: {
                  label: this._languageService.getTransValue('matters.chamber'),
                  required: true,
                },
              },
              {
                className: 'col-lg-3 col-md-4',
                key: 'rollNumber',
                type: 'input',
                props: {
                  label:
                    this._languageService.getTransValue('matters.rollNumber'),
                  required: true,
                },
              },
              {
                className: 'col-lg-3 col-md-4',
                key: 'adjournmentReason',
                type: 'select',
                props: {
                  label: this._languageService.getTransValue(
                    'matters.adjournmentReason'
                  ),
                  required: true,
                  options: [
                    { label: 'Option 1', value: 'Option 1' },
                    { label: 'Option 2', value: 'Option 2' },
                    { label: 'Option 3', value: 'Option 3' },
                    { label: 'Option 4', value: 'Option 4' },
                  ],
                },
              },
              {
                className: 'col-lg-3 col-md-4',
                key: 'litigator',
                type: 'select',
                props: {
                  label:
                    this._languageService.getTransValue('matters.litigator'),
                  required: true,
                  options: [
                    { label: 'Option 1', value: 'Option 1' },
                    { label: 'Option 2', value: 'Option 2' },
                    { label: 'Option 3', value: 'Option 3' },
                    { label: 'Option 4', value: 'Option 4' },
                  ],
                },
              },
             
              {
                className: 'col-lg-3 col-md-4',
                key: 'startDate',
                type: 'date',
                props: {
                  label: this._languageService.getTransValue('matters.startDate'),
                  required: true,
                  showTime:true
                },
              },
    
              {
                className: 'col-lg-3 col-md-4',
                key: 'status',
                type: 'select',
                props: {
                  label: this._languageService.getTransValue('matters.status'),
                  required: true,
                  options: [
                    { label: 'Created', value: 'Created' },
                    { label: 'Started', value: 'Started' },
                    { label: 'Hold', value: 'Hold' },
                    { label: 'Completed', value: 'Completed' },
                  ],
                },
              },
              {
                className: 'col-lg-3 col-md-4',
                key: 'duration',
                type: 'input',
                props: {
                  label: this._languageService.getTransValue('matters.duration'),
                  required: true,
                  type: 'number',
                },
              },
              {
                className: 'col-lg-3 col-md-4',
                key: 'priority',
                type: 'select',
                props: {
                  label: this._languageService.getTransValue('matters.priority'),
                  required: true,
                  options: [
                    { label: 'Created', value: 'Created' },
                    { label: 'Started', value: 'Started' },
                    { label: 'Hold', value: 'Hold' },
                    { label: 'Completed', value: 'Completed' },
                  ],
                },
              },
              {
                className: 'col-lg-3 col-md-4',
                key: 'taskSelection',
                type: 'select',
                props: {
                  label: this._languageService.getTransValue(
                    'matters.taskSelection'
                  ),
                  required: true,
                  options: [
                    { label: 'Billable', value: 'Billable' },
                    { label: 'Non-Billable', value: 'Non-Billable' },
                    { label: 'No-Charge', value: 'No-Charge' },
                  ],
                },
              },
              {
                className: 'col-lg-3 col-md-4',
                key: 'finalJudgement',
                type: 'checkbox',
                props: {
                  label: this._languageService.getTransValue(
                    'matters.finalJudgement'
                  ),
                  required: true,
                },
              },
              {
                className: 'col-lg-3 col-md-4',
                key: 'finalJudgementType',
                type: 'select',
                props: {
                  label: this._languageService.getTransValue(
                    'matters.finalJudgement'
                  ),
                  required: true,
                  options: [
                    { label: 'Option 1', value: 'Option 1' },
                    { label: 'Option 2', value: 'Option 2' },
                    { label: 'Option 3', value: 'Option 3' },
                    { label: 'Option 4', value: 'Option 4' },
                  ],
                },
                expressions: {
                  hide: (field: FormlyFieldConfig) => {
                    return !field.model?.finalJudgement;
                  },
                },
              },
              {
                className: 'col-lg-3 col-md-4',
                key: 'cassationOrAppealPeriod',
                type: 'input',
                props: {
                  label: this._languageService.getTransValue(
                    'matters.cassationOrAppealPeriod'
                  ),
                  required: true,
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
                return (
                  field.model?.activityType != 'Hearing Session' ||
                  !field.model?.activityType
                );
              },
            },
          },
          {
            fieldGroupClassName: 'form-section row',
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
                  required: true,
                },
              },
              {
                className: 'col-12',
                key: 'remark',
                type: 'textarea',
                props: {
                  label: this._languageService.getTransValue('matters.remark'),
                  required: true,
                },
              },

              {
                className: 'col-lg-3 col-md-4',
                key: 'chamber',
                type: 'input',
                props: {
                  label: this._languageService.getTransValue('matters.chamber'),
                  required: true,
                },
              },
              {
                className: 'col-lg-3 col-md-4',
                key: 'rollNumber',
                type: 'input',
                props: {
                  label:
                    this._languageService.getTransValue('matters.rollNumber'),
                  required: true,
                },
              },
              {
                className: 'col-lg-3 col-md-4',
                key: 'startDate',
                type: 'date',
                props: {
                  label: this._languageService.getTransValue('matters.startDate'),
                  required: true,
                  showTime:true
                },
              },
    
              {
                className: 'col-lg-3 col-md-4',
                key: 'status',
                type: 'select',
                props: {
                  label: this._languageService.getTransValue('matters.status'),
                  required: true,
                  options: [
                    { label: 'Created', value: 'Created' },
                    { label: 'Started', value: 'Started' },
                    { label: 'Hold', value: 'Hold' },
                    { label: 'Completed', value: 'Completed' },
                  ],
                },
              },
            ],
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return (
                  field.model?.adjournmentReason != 'Option 1' ||
                  !field.model?.adjournmentReason
                );
              },
            },
          },
        ],
      },
    ];
  }
  override onSubmit(): void {
    if (this.formly.valid) {
      this.address.push({ ...this.formlyModel });
      this._matterService.activity$.next(this.address);
      this._DialogService.dialogComponentRefMap.forEach((dialog) => {
        dialog.destroy();
      });
    }
  }
}
