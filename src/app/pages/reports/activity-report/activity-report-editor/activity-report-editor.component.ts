import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { ClientService } from '@shared/services/client.service';
import { SharedModule } from '@shared/shared.module';
import { forkJoin, finalize } from 'rxjs';

@Component({
  selector: 'app-activity-report-editor',
  templateUrl: './activity-report-editor.component.html',
  styleUrls: ['./activity-report-editor.component.scss'],
  standalone: true,
  imports: [FormlyConfigModule, SharedModule],
})
export class ActivityReportEditorComponent
  extends FormBaseClass
  implements OnInit
{
  @Output() onFilter = new EventEmitter()
  ngOnInit(): void {
    this.getLookupsData();
  }
  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-md-3',
            key: 'dateFrom',
            type: 'date',
            props: {
              label: this._languageService.getTransValue('report.dateFrom'),
            },
          },
          {
            className: 'col-md-3',
            key: 'dateTo',
            type: 'date',
            props: {
              label: this._languageService.getTransValue('report.dateTo'),
            },
          },
          {
            className: 'col-md-3',
            key: 'matter',
            type: 'select',
            props: {
              label: this._languageService.getTransValue('matters.title'),
              options: [
                { label: 'Matter 1', value: 'Matter 1' },
                { label: 'Matter 2', value: 'Matter 2' },
              ],
            },
          },
          {
            className: 'col-md-3',
            key: 'activityType',
            type: 'multi-select',
            props: {
              label: this._languageService.getTransValue('matters.activityType'),
              options: this.lookupsData[0].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },
          {
            type: 'multi-select',
            key: 'jurisdictionId',
            className: 'col-md-3',
            props: {
              label: this._languageService.getTransValue('matters.jurisdicion'),

              options: this.lookupsData[1].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            }
          },
          {
            type: 'multi-select',
            key: 'statusId',
            className: 'col-md-3',
            props: {
              label: this._languageService.getTransValue(
                'matters.matterStatus'
              ),

              
              options: this.lookupsData[2].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            }
          },
          {
            type: 'multi-select',
            key: 'stageId',
            className: 'col-md-3',
            props: {
              label: this._languageService.getTransValue('matters.stage'),

              
              options: this.lookupsData[3].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            }
          },
          {
            type: 'multi-select',
            key: 'stageId',
            className: 'col-md-3',
            props: {
              label: this._languageService.getTransValue('matters.stage'),

              
              options: this.lookupsData[3].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            }
          },
          {
            type: 'multi-select',
            key: 'matterType',
            className: 'col-md-3',
            props: {
              label: this._languageService.getTransValue('matters.matterType'),

              
              options: this.lookupsData[4].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            }
          },
          {
            type: 'multi-select',
            key: 'laywer',
            className: 'col-md-3',
            props: {
              label: this._languageService.getTransValue('report.lawyer'),
              options: this.lookupsData[5].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            }
          },
          {
            type: 'multi-select',
            key: 'client',
            className: 'col-md-3',
            props: {
              label: this._languageService.getTransValue('report.client'),
              options: this.lookupsData[6].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            }
          },
        ],
      },
    ];
  }
  override getLookupsData(): void {
    forkJoin([
      this._apiService.get(API_Config.general.getActivityType),
      this._apiService.get(API_Config.general.getJurisdictionLookup),
      this._apiService.get(API_Config.general.getMatterStatus),
      this._apiService.get(API_Config.general.getStages),
      this._apiService.get(API_Config.general.getAllMatterTypes),
      this._apiService.get(API_Config.general.getLawyerShort),
      this._apiService.get(API_Config.matterClientSecurity.get),
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

  override onSubmit(): void {
    this.onFilter.emit(this.formlyModel)
  }
}
