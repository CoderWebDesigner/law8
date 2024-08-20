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
  @Output() onFilter = new EventEmitter();
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
            defaultValue: new Date(),
            props: {
              label: this._languageService.getTransValue('report.dateFrom'),
            },
          },
          {
            className: 'col-md-3',
            key: 'dateTo',
            type: 'date',
            defaultValue: new Date(),
            props: {
              label: this._languageService.getTransValue('report.dateTo'),
            },
          },
          {
            className: 'col-md-3',
            key: 'matterIds',
            type: 'select',
            props: {
              label: this._languageService.getTransValue('matters.title'),
              options: this.lookupsData[7].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },
          {
            className: 'col-md-3',
            key: 'activityTypeIds',
            type: 'multi-select',
            props: {
              label: this._languageService.getTransValue(
                'matters.activityType'
              ),
              options: this.lookupsData[0].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },
          {
            type: 'multi-select',
            key: 'juriductionsIds',
            className: 'col-md-3',
            props: {
              label: this._languageService.getTransValue('matters.jurisdicion'),

              options: this.lookupsData[1].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },
          {
            type: 'multi-select',
            key: 'matterStatusIds',
            className: 'col-md-3',
            props: {
              label: this._languageService.getTransValue(
                'matters.matterStatus'
              ),

              options: this.lookupsData[2].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },
          {
            type: 'multi-select',
            key: 'stagesIds',
            className: 'col-md-3',
            props: {
              label: this._languageService.getTransValue('matters.stage'),

              options: this.lookupsData[3].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },
          // {
          //   type: 'multi-select',
          //   key: 'stageId',
          //   className: 'col-md-3',
          //   props: {
          //     label: this._languageService.getTransValue('matters.stage'),

          //     options: this.lookupsData[3].result.map((obj) => ({
          //       label: obj.name,
          //       value: obj.id,
          //     })),
          //   }
          // },
          {
            type: 'multi-select',
            key: 'matterTypeIds',
            className: 'col-md-3',
            props: {
              label: this._languageService.getTransValue('matters.matterType'),

              options: this.lookupsData[4].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },
          {
            type: 'multi-select',
            key: 'lawyerIds',
            className: 'col-md-3',
            props: {
              label: this._languageService.getTransValue('report.lawyer'),
              options: this.lookupsData[5].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },
          {
            type: 'multi-select',
            key: 'clientIds',
            className: 'col-md-3',
            props: {
              label: this._languageService.getTransValue('report.client'),
              options: this.lookupsData[6].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
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
      this._apiService.get(API_Config.general.getAllMatter),
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
    this.isLoading=true
    this._apiService.post(API_Config.report.create,this.formlyModel).pipe(
      finalize(()=>this.isLoading=false)
    ).subscribe({
      next:(res:any)=>{
        const base64File = `data:application/pdf;base64,${res.result}`;
        this.onFilter.emit(base64File)
      // this.urlSafe =this._sanitizer.bypassSecurityTrustResourceUrl(base64File);
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
    
  }

  // override onSubmit(): void {
  //   if (!this.isSubmit) { 
  //     this.isSubmit = true; 
  //     setTimeout(() => {
  //       this.isSubmit = false; 
  //       this.onFilter.emit(this.formlyModel);
  //     }, 1000); 
  //   } else {
  //     this.onFilter.emit(this.formlyModel); 
  //   }
  // }
}
