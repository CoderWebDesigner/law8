import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { forkJoin, finalize } from 'rxjs';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';
import { FormlyFieldConfig } from '@ngx-formly/core';


@Component({
  selector: 'app-matter-report-editor',
  standalone: true,
  imports: [FormlyConfigModule, SharedModule],
  templateUrl: './matter-report-editor.component.html',
  styleUrls: ['./matter-report-editor.component.scss']
})
export class MatterReportEditorComponent  extends FormBaseClass
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
          type: 'radio',
            key: 'typeId',
            defaultValue: 1,
            className: 'col-12',
            props: {
              label: this._languageService.getTransValue('report.dateType'),
              placeholder: '',
              options: [
                { label: 'Open Date', value: 1 },
                { label: 'Creation Date', value: 2 },
              ],
            },
        },
        {
          className: 'col-md-3',
          key: 'dateFrom',
          type: 'date',
          defaultValue: new Date(),
          props: {
            label: this._languageService.getTransValue('report.openDateFrom'),
          },
        },
        {
          className: 'col-md-3',
          key: 'dateTo',
          type: 'date',
          defaultValue: new Date(),
          props: {
            label: this._languageService.getTransValue('report.openDateTo'),
          },
        },
        {
          type: 'multi-select',
          key: 'clientIds',
          className: 'col-md-3',
          props: {
            label: this._languageService.getTransValue('report.client'),
            options: this.lookupsData[5].result.map((obj) => ({
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
            options: this.lookupsData[4].result.map((obj) => ({
              label: obj.name,
              value: obj.id,
            })),
          },
        },
        {
          type: 'multi-select',
          key: 'matterCategoryIds',
          className: 'col-md-3',
          props: {
            label: this._languageService.getTransValue('common.matterCategory'),

            options: this.lookupsData[6].result.map((obj) => ({
              label: obj.name,
              value: obj.id,
            })),
          },
        },
        {
          type: 'multi-select',
          key: 'matterTypeIds',
          className: 'col-md-3',
          props: {
            label: this._languageService.getTransValue('matters.matterType'),

            options: this.lookupsData[3].result.map((obj) => ({
              label: obj.name,
              value: obj.id,
            })),
          },
        },
        {
          type: 'select',
          key: 'juriductionsIds',
          className: 'col-md-3',
          props: {
            label: this._languageService.getTransValue('matters.jurisdicion'),

            options: this.lookupsData[0].result.map((obj) => ({
              label: obj.name,
              value: obj.id,
            })),
          },
        },
        {
          type: 'multi-select',
          key: 'juriductureIds',
          className: 'col-md-3',
          props: {
            label:
              this._languageService.getTransValue('matters.judicature'),
              // options: this.lookupsData[7].result.map((obj) => ({
              //   label: obj.name,
              //   value: obj.id,
              // })),
          },
          hooks: {
            onInit: (field: FormlyFieldConfig) => {
              // console.log('field');
              this.formly.get('juriductionsIds').valueChanges.subscribe({
                next: (res) => {
                  console.log(res);
                  if (res) {
                    this._apiService
                      .get(
                        `${API_Config.general.getJudicatureByJurisdictionId}?Law_JurisdictionId=${res}`
                      )
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
            },
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

            options: this.lookupsData[1].result.map((obj) => ({
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

            options: this.lookupsData[2].result.map((obj) => ({
              label: obj.name,
              value: obj.id,
            })),
          },
        },
       
        {
          type: 'multi-select',
          key: 'referralTypeIds',
          className: 'col-md-3',
          props: {
            label: this._languageService.getTransValue(
              'matters.referralType'
            ),
            options: this.lookupsData[7].result.map((obj) => ({
              label: obj.name,
              value: obj.id,
            })),
          },
        },
        {
          type: 'select',
          key: 'branchId',
          className: 'col-lg-3 col-md-4',
          props: {
            label: this._languageService.getTransValue('common.branch'),
            options: this.lookupsData[8]?.result.map((obj) => ({
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

    this._apiService.get(API_Config.general.getJurisdictionLookup),
    this._apiService.get(API_Config.general.getMatterStatus),
    this._apiService.get(API_Config.general.getStages),
    this._apiService.get(API_Config.general.getAllMatterTypes),
    this._apiService.get(API_Config.general.getLawyerShort),
    this._apiService.get(API_Config.matterClientSecurity.get),
    this._apiService.get(API_Config.general.getMatterCategoriesLookup),
    this._apiService.get(API_Config.general.getReferralType),
    this._apiService.get(API_Config.general.getAllBranches),
    // this._apiService.get(API_Config.general.getJudicatureByJurisdictionId),
    
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
  this._apiService.post(API_Config.matterReport.create,this.formlyModel).pipe(
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

}

