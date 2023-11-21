import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './storage.service';
import { DEFAULT_LANGUAGE } from '@core/utilities/defines';


@Injectable({ providedIn: 'root' })
export class LanguageService {
  languages: string[] = ['en', 'ar','in'];

  _storageService = inject(StorageService);
  _translateService = inject(TranslateService);


  initLang() {
    let selectedLang = this._storageService.getStorage('lang');

    if (!selectedLang) {
      selectedLang = DEFAULT_LANGUAGE;
      this._storageService.setStorage('lang', DEFAULT_LANGUAGE);
    }

    this._translateService.addLangs(this.languages);
    this._translateService.setDefaultLang(selectedLang);
    this._translateService.use(selectedLang);
    this.changeDirection(selectedLang)
    this.appendStyle(selectedLang)
  }


  setLanguage(lang: string) {
    this._translateService.use(lang);
    this._storageService.setStorage('lang', lang);
    window.location.reload()
  }

  getSelectedLanguage() {
    return this._storageService.getStorage('lang') || this._translateService.getBrowserLang()
  }


  getTransValue(value: string) {
    return this._translateService.instant(value)
  }

  changeDirection(lang: string) {
    const htmlTag = window.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    const bodyTag = window.document.getElementsByTagName("body")[0];
    htmlTag.dir = lang === "ar" ? "rtl" : "ltr";
    bodyTag.className = lang === "ar" ? "rtl" : "ltr";
    htmlTag.lang = lang;
  }

  appendStyle(lang: string){
    console.log(true);
    const head = window.document.getElementsByTagName("head")[0];
    const link = window.document.createElement('link');
    link.rel = 'stylesheet';
    link.href = lang === "ar" ? "app-rtl.css" : "app.css";
    head.appendChild(link)
  }

}
