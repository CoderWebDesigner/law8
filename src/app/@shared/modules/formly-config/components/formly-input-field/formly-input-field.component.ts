import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-input-field',
  templateUrl: './formly-input-field.component.html',
  styleUrls: ['./formly-input-field.component.scss'],
})
export class FormlyInputFieldComponent extends FieldType<FieldTypeConfig> {
  showPassword!:boolean;
  togglePassword(){
    this.showPassword =!this.showPassword
  }
}
