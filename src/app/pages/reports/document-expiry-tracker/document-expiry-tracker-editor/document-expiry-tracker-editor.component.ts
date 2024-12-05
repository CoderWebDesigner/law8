import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { forkJoin, finalize, combineLatest } from 'rxjs';

@Component({
  selector: 'app-document-expiry-tracker-editor',
  standalone: true,
  imports: [CommonModule,FormlyConfigModule, SharedModule],
  templateUrl: './document-expiry-tracker-editor.component.html',
  styleUrls: ['./document-expiry-tracker-editor.component.scss']
})
export class DocumentExpiryTrackerEditorComponent extends FormBaseClass
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
            options: this.lookupsData.clients.result.map((obj) => ({
              label: obj.name,
              value: obj.id,
            })),
          },
        },
        {
          type: 'multi-select',
          key: 'practiceArea',
          className: 'col-md-3',
          props: {
            label: this._languageService.getTransValue('common.practiceArea'),
            options: this.lookupsData.practiceArea.result.map((obj) => ({
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
            options: this.lookupsData.lawyers.result.map((obj) => ({
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

            options: this.lookupsData.matterCategories.result.map((obj) => ({
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

            options: this.lookupsData.jurisdiction.result.map((obj) => ({
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
            options: this.lookupsData.branches?.result.map((obj) => ({
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
  combineLatest({

    jurisdiction:this._apiService.get(API_Config.general.getJurisdictionLookup),
    matters:this._apiService.get(API_Config.general.getAllMatterTypes),
    lawyers:this._apiService.get(API_Config.general.getLawyerShort),
    matterCategories:this._apiService.get(API_Config.general.getMatterCategoriesLookup),
    branches:this._apiService.get(API_Config.general.getAllBranches),
    clients:this._apiService.get(API_Config.matterClientSecurity.get),
    practiceArea:this._apiService.get(API_Config.general.getPractsAreaLookup),
    
  })
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

