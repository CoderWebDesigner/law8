import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-multi-select-field',
  templateUrl: './formly-multi-select-field.component.html',
  styleUrls: ['./formly-multi-select-field.component.scss']
})
export class FormlyMultiSelectFieldComponent  extends FieldType<FieldTypeConfig>{

}
