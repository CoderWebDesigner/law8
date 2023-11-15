import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-input-filed',
  templateUrl: './formly-input-filed.component.html',
  styleUrls: ['./formly-input-filed.component.scss'],
})
export class FormlyInputFiledComponent extends FieldType<FieldTypeConfig> {}
