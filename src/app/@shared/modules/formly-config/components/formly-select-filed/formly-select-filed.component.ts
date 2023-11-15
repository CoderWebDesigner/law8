import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-select-filed',
  templateUrl: './formly-select-filed.component.html',
  styleUrls: ['./formly-select-filed.component.scss']
})
export class FormlySelectFiledComponent extends FieldType <FieldTypeConfig>{}
