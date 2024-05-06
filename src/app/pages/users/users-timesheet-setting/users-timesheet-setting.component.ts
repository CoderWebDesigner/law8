import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';

@Component({
  selector: 'app-users-timesheet-setting',
  templateUrl: './users-timesheet-setting.component.html',
  styleUrls: ['./users-timesheet-setting.component.scss'],
  providers:[DatePipe]
})
export class UsersTimesheetSettingComponent extends FormBaseClass implements OnInit {
  @Output() onClose = new EventEmitter()
  @Output() onFilter = new EventEmitter()
  _datePipe=inject(DatePipe)
  ngOnInit(): void {
    this.initForm()
  }
  override initForm(): void {
    this.formlyFields = [
      {
        type: 'date',
        key: 'TimeSheetDate',
        props: {
          required: true,
        }
      }
    ]
  }
  // override onSubmit(): void {
  //   if (this.formly.invalid) {
  //     return
  //   }
  //   let formData = new FormData()
  //   const date = this._datePipe.transform(
  //     this.formlyModel.TimeSheetDate,
  //     'yyyy-MM-ddTHH:mm:ss.SSSZ'
  //   );
  //   formData.append('TimeSheetDate',date)
  //   this._apiService.post(API_Config.users.editTimeSheetDate,formData).pipe(
  //     this._sharedService.takeUntilDistroy()
  //   ).subscribe({
  //     next:(res:ApiRes)=>{
  //       if(res.isSuccess){
  //         this.onFilter.emit(true)
  //         this.onClose.emit(false)
  //       }
  //     }
  //   })
  // }
  override onSubmit(): void {
    if (this.formly.invalid) {
      return;
    }
  
    let formData = new FormData();
    
    const date = new Date(this.formlyModel.TimeSheetDate).toISOString();
    
    formData.append('TimeSheetDate', date);
  
    this._apiService.post(API_Config.users.editTimeSheetDate, formData)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          if (res.isSuccess) {
            this.onFilter.emit(true);
            this.onClose.emit(false);
          }
        }
      });
  }
  cancel() {
    this.onClose.emit(false)
  }

}
