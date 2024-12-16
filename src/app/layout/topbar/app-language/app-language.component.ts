import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Language } from './language.model';
import { LanguageService } from '@core/services';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language',
  templateUrl: './app-language.component.html',
  styleUrls: ['./app-language.component.scss'],
  standalone:true,
  imports:[CommonModule,DropdownModule,FormsModule],
  encapsulation: ViewEncapsulation.None
})
export class AppLanguageComponent implements OnInit {

  activeLang: Language | undefined;

  listLang: Language[] = [
    { text: 'English', flag: 'assets/images/icons/us.jpg', code: 'en' },
    { text: 'العربية', flag: 'assets/images/icons/ar.png', code: 'ar' },
    { text: 'Français', flag: 'assets/images/icons/fr.png', code: 'fr' },
  ];

  _languageService = inject(LanguageService)

  ngOnInit(): void {

    this.activeLang = this.listLang.find(lang => lang?.code === this._languageService.getSelectedLanguage())
    if (!this.activeLang) {
      this.activeLang = this.listLang[0]
      this.setActiveLang(this.activeLang)
    }
  }

  setActiveLang(e?: any) {
    let lang = e?.value
    this._languageService.setLanguage(lang?.code)
  }

}
