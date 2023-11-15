import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-formly-button-filed',
  templateUrl: './formly-button-filed.component.html',
  styleUrls: ['./formly-button-filed.component.scss'],
})
export class FormlyButtonFiledComponent extends FieldType<FieldTypeConfig> {
  onClick(){
    if(this.props["onClick"]){
      this.props['onClick']()
    }
  }
}
