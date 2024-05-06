import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';

@Component({
  selector: 'app-task-management-calender-filter-form',
  templateUrl: './task-management-calender-filter-form.component.html',
  styleUrls: ['./task-management-calender-filter-form.component.scss']
})
export class TaskManagementCalenderFilterFormComponent extends FormBaseClass implements OnInit {
  @Output() onClose = new EventEmitter()
  @Output() onFilter = new EventEmitter()
  ngOnInit(): void {
    this.getLookupsData()
  }

  override getLookupsData(): void {
    this._apiService.get(API_Config.general.getAssignedUsersCalender).pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next:(res:ApiRes)=>{
        if(res.isSuccess){
          this.lookupsData=res.result
          this.initForm()
        }
      }
    })
  }
  override initForm(): void {
    this.formlyFields = [
      {
        type: 'select',
        key: 'userId',
        // defaultValue:this._authService.getDecodedToken()['Id'],
        props: {
          required: true,
          options: this.lookupsData.map(obj=>({label:obj.name,value:obj.id}))
        }
      }
    ]
  }
  override onSubmit(): void {
    if (this.formly.invalid) {
      return
    }
    this.onFilter.emit(this.formlyModel.userId)
    this.onClose.emit(false)
  }
  cancel() {
    this.onClose.emit(false)
  }

}
