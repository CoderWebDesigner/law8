import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-select-field',
  templateUrl: './formly-select-field.component.html',
  styleUrls: ['./formly-select-field.component.scss']
})
export class FormlySelectFieldComponent extends FieldType <FieldTypeConfig>{

  change(e){
    if(this.props['onChange']) this.props['onChange'](e)
  }
  onClick(){
    if(this.props['onClick']) this.props['onClick'](this.field)
  }
}
