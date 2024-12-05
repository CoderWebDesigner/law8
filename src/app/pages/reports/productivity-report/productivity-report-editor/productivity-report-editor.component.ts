import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';

import { combineLatest, finalize } from 'rxjs';

@Component({
  selector: 'app-productivity-report-editor',
  templateUrl: './productivity-report-editor.component.html',
  styleUrls: ['./productivity-report-editor.component.scss'],
  standalone:true,
  imports:[FormlyConfigModule, SharedModule]
})
export class ProductivityReportEditorComponent  extends FormBaseClass
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
          key: 'matterIds',
          className: 'col-md-3',
          props: {
            label: this._languageService.getTransValue('report.matter'),
            options: this.lookupsData.matters.result.map((obj) => ({
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
    matters:this._apiService.get(API_Config.general.getAllMatter),
    lawyers:this._apiService.get(API_Config.general.getLawyerShort),
    clients:this._apiService.get(API_Config.matterClientSecurity.get),
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
