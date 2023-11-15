import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-password-filed',
  templateUrl: './formly-password-filed.component.html',
  styleUrls: ['./formly-password-filed.component.scss']
})
export class FormlyPasswordFiledComponent extends FieldType<FieldTypeConfig> {}