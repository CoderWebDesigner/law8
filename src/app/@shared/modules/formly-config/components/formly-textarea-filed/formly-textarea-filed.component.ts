import { Component, Input } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-textarea-filed',
  templateUrl: './formly-textarea-filed.component.html',
  styleUrls: ['./formly-textarea-filed.component.scss']
})
export class FormlyTextareaFiledComponent extends FieldType <FieldTypeConfig>{


}