import { FieldType, FieldTypeConfig } from "@ngx-formly/core";

import { Component } from '@angular/core';

@Component({
  selector: 'app-formly-switch-field',
  templateUrl: './formly-switch-field.component.html',
  styleUrls: ['./formly-switch-field.component.scss']
})
export class FormlySwitchFieldComponent extends FieldType <FieldTypeConfig>{

}
