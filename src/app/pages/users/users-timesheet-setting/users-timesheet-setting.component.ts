import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';

@Component({
  selector: 'app-users-timesheet-setting',
  templateUrl: './users-timesheet-setting.component.html',
  styleUrls: ['./users-timesheet-setting.component.scss']
})
export class UsersTimesheetSettingComponent extends FormBaseClass implements OnInit {
  @Output() onClose = new EventEmitter()
  @Output() onFilter = new EventEmitter()
  ngOnInit(): void {
    this.initForm()
  }
  override initForm(): void {
    this.formlyFields = [
      {
        type: 'date',
        key: 'timesheetDate',
        props: {
          required: true,
        }
      }
    ]
  }
  override onSubmit(): void {
    if (this.formly.invalid) {
      return
    }
    this.onFilter.emit(this.formlyModel)
    this.onClose.emit(false)
  }
  cancel() {
    this.onClose.emit(false)
  }

}
