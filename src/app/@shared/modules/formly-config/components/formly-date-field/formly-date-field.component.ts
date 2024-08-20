import { Component, ElementRef, ViewChild } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-date-field',
  templateUrl: './formly-date-field.component.html',
  styleUrls: ['./formly-date-field.component.scss']
})
export class FormlyDateFieldComponent extends FieldType<FieldTypeConfig>{

  onSelect(e){
    // if(this.props['showTime']) this.formControl.setValue(this.getDate(e))
  }
  getDate(date: Date) {
    let dateFrom = new Date(date);
    let dateValue = new Date(
      Date.UTC(
        dateFrom.getFullYear(),
        dateFrom.getMonth(),
        dateFrom.getDate(),
        dateFrom.getHours(),
        dateFrom.getMinutes()
      )
    );
    return dateValue;
  }
}
