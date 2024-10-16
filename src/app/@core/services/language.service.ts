import { Inject, Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './storage.service';
import { DEFAULT_LANGUAGE } from '@core/utilities/defines';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { SharedService } from '@shared/services/shared.service';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  languages: string[] = ['en', 'ar', 'fr'];

  _storageService = inject(StorageService);
  _translateService = inject(TranslateService);
  _sharedService=inject(SharedService)
  document = inject(DOCUMENT);
  // constructor(@Inject(DOCUMENT) private document: any) {}
  async initLang() {
    return new Promise(async (resolve) => {
      let selectedLang = this._storageService.getStorage('lang');

      if (!selectedLang) {
        selectedLang = DEFAULT_LANGUAGE;
        this._storageService.setStorage('lang', DEFAULT_LANGUAGE);
      }

      this._translateService.addLangs(this.languages);
      this._translateService.setDefaultLang(selectedLang);
      this._translateService.use(selectedLang);
      this.changeDirection(selectedLang);

      await this.appendStyle(selectedLang)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          console.error('Error appending style:', error);
          resolve(false);
        });
    });

    // await this.appendStyle(selectedLang)
  }

  setLanguage(lang: string) {
    this._translateService.use(lang);
    this._storageService.setStorage('lang', lang);
    window.location.reload();
  }

  getSelectedLanguage() {
    return (
      this._storageService.getStorage('lang') ||
      this._translateService.getBrowserLang()
    );
  }

  getTransValue(value: string, obj?: { [key: string]: any }) {
    return this._translateService.instant(value, obj);
  }

  changeDirection(lang: string) {
    const htmlTag = window.document.getElementsByTagName(
      'html'
    )[0] as HTMLHtmlElement;
    const bodyTag = window.document.getElementsByTagName('body')[0];
    htmlTag.dir = lang === 'ar' ? 'rtl' : 'ltr';
    bodyTag.className = lang === 'ar' ? 'rtl' : 'ltr';
    htmlTag.lang = lang;
  }

  // async appendStyle(lang: string): Promise<boolean>{
  //   return new Promise((resolve,reject)=>{

  //     const head = window.document.getElementsByTagName("head")[0];
  //     const link = window.document.createElement('link');
  //     link.rel = 'stylesheet';
  //     link.href = lang === "ar" ? "app-rtl.css" : "app.css";
  //     link.addEventListener('load', () => {
  //       resolve(true);
  //       setTimeout(() => {
  //         // this._sharedService.setSysReady(true)
  //       }, 500);
  //     });
  //     link.addEventListener('error', (error: any) => {
  //       reject(error);
  //     });
  //     head.appendChild(link)
  //   })
  // }
  async appendStyle(lang: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const head = this.document.getElementsByTagName('head')[0];
      const link = this.document.createElement('link');
      link.rel = 'stylesheet';
      link.href = lang === 'ar' ? 'app-rtl.css' : 'app.css';

      link.addEventListener('load', () => {
        resolve(true);
        setTimeout(() => {
          this._sharedService.systemReady$.next(true)
        }, 500);
      });

      // Event listener for loading errors
      link.addEventListener('error', (error: any) => {
        reject(error);
      });

      head.appendChild(link);
    });
  }
}
