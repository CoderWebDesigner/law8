import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';

@Component({
  selector: 'app-task-management-calender-filter-form',
  templateUrl: './task-management-calender-filter-form.component.html',
  styleUrls: ['./task-management-calender-filter-form.component.scss']
})
export class TaskManagementCalenderFilterFormComponent extends FormBaseClass implements OnInit {
  @Output() onClose = new EventEmitter()
  @Output() onFilter = new EventEmitter()
  ngOnInit(): void {
    this.initForm()
  }
  override initForm(): void {
    this.formlyFields = [
      {
        type: 'select',
        key: 'user',
        props: {
          required: true,
          options: [
            { label: 'All', value: 'All' },
            { label: 'Ahmed Galal', value: 'Ahmed Galal' },
            { label: 'Karim Galal', value: 'Karim Galal' },
            { label: 'Ahmed Awad', value: 'Ahmed Awad' },
            { label: 'Sara Awad', value: 'Sara Awad' },
            { label: 'Fatma Awad', value: 'Fatma Awad' },
            { label: 'Mariem Galal', value: 'Mariem Galal' },
          ]
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
