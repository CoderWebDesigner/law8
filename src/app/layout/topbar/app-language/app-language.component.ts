import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Language } from './language.model';
import { LanguageService } from '@core/services';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-app-language',
  templateUrl: './app-language.component.html',
  styleUrls: ['./app-language.component.scss'],
})
export class AppLanguageComponent implements OnInit {
  activeLang: Language | undefined;

  listLang: any[] = [
    {
      label: 'English',
      flag: 'assets/images/icons/us.jpg',
      icon: 'fat-bg fat-en',
      code: 'en',
      command:()=>{
        this.setActiveLang('en')
      }
    },
    {
      label: 'العربية',
      flag: 'assets/images/icons/ar.png',
      icon: 'fat-bg fat-ar',
      code: 'ar',
      command:()=>{
        this.setActiveLang('ar')
      }
    },
  ];

  _languageService = inject(LanguageService);

  ngOnInit(): void {
    this.activeLang = this.listLang.find(
      (lang) => lang?.code === this._languageService.getSelectedLanguage()
    );
    if (!this.activeLang) {
      this.activeLang = this.listLang[0];
      this.setActiveLang(this.activeLang?.code);
    }
  }

  setActiveLang(lang:string) {
    this._languageService.setLanguage(lang);
  }
}
