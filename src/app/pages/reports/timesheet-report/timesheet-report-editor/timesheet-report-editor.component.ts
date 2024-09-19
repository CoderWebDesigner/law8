import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';
import { forkJoin, finalize } from 'rxjs';

@Component({
  selector: 'app-timesheet-report-editor',
  standalone: true,
  imports: [CommonModule,FormlyConfigModule, SharedModule],
  templateUrl: './timesheet-report-editor.component.html',
  styleUrls: ['./timesheet-report-editor.component.scss']
})
export class TimesheetReportEditorComponent extends FormBaseClass
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
          className: 'col-md-3',
          key: 'matterIds',
          type: 'multi-select',
          props: {
            label: this._languageService.getTransValue('matters.title'),
            options: this.lookupsData[0].result.map((obj) => ({
              label: obj.name,
              value: obj.id,
            })),
          },
        },  
        {
          className: 'col-md-3',
          key: 'lawyerIds',
          type: 'multi-select',
          props: {
            label: this._languageService.getTransValue('report.feeEarner'),
            options: this.lookupsData[1].result.map((obj) => ({
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
    this._apiService.get(API_Config.general.getAllMatter),  
    this._apiService.get(API_Config.general.getUsersInitialSaparateForTimeShet),  
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
  this._apiService.post(API_Config.timesheetReport.create,this.formlyModel).pipe(
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
