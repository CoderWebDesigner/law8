import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-editor-filed',
  templateUrl: './formly-editor-filed.component.html',
  styleUrls: ['./formly-editor-filed.component.scss']
})
export class FormlyEditorFiledComponent extends FieldType <FieldTypeConfig>{}
