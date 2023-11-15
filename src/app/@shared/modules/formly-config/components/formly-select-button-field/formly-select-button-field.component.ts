import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { Component } from '@angular/core';



@Component({
  selector: 'app-formly-select-button-field',
  templateUrl: './formly-select-button-field.component.html',
  styleUrls: ['./formly-select-button-field.component.scss'],
})
export class FormlySelectButtonFieldComponent extends FieldType<FieldTypeConfig> {
 

  onOptionClick(e){
    if(this.props['onOptionClick']) this.props['onOptionClick'](e)
  }
    
 
 


}
