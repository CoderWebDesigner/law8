import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-radio-button-filed',
  templateUrl: './formly-radio-button-filed.component.html',
  styleUrls: ['./formly-radio-button-filed.component.scss']
})
export class FormlyRadioButtonFiledComponent extends FieldType <FieldTypeConfig> {

  selectedIndex: number;
  onClick(){
    if(this.props['onClick']) this.props['onClick'](this.formControl.value)
  }
}
