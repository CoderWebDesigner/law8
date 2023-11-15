import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-date-filed',
  templateUrl: './formly-date-filed.component.html',
  styleUrls: ['./formly-date-filed.component.scss']
})
export class FormlyDateFiledComponent extends FieldType<FieldTypeConfig> {}
