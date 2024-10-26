import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-checkbox-field',
  templateUrl: './formly-checkbox-field.component.html',
  styleUrls: ['./formly-checkbox-field.component.scss'],

})
export class FormlyCheckboxFieldComponent extends FieldType<FieldTypeConfig>{

}
