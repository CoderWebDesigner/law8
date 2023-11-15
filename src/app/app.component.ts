import { LanguageService } from './@core/services/language.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  _languageService = inject(LanguageService);

  constructor(){
    this._languageService.initLang()
  }
}
