import { Component, OnInit, inject } from '@angular/core';
import { LanguageService } from '@core/services';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-input-field',
  templateUrl: './formly-input-field.component.html',
  styleUrls: ['./formly-input-field.component.scss'],
})
export class FormlyInputFieldComponent extends FieldType<FieldTypeConfig> implements OnInit{
  showPassword!:boolean;
  lang:string;
  _languageService = inject(LanguageService)
  ngOnInit(): void {
    this.lang=this._languageService.getSelectedLanguage()
  }
  togglePassword(){
    this.showPassword =!this.showPassword
  }
  onKeyUp(){
    if(this.props['onKeyUp']) this.props['onKeyUp']()
  }
}
