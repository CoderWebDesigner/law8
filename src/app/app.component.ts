import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { LanguageService } from './@core/services/language.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  _languageService = inject(LanguageService);
  _router=inject(Router)
  isLoading:boolean;

  constructor(){
    this._languageService.initLang()
  }
  ngOnInit(): void {
    this.checkRoutes() 
  }
  checkRoutes() {
    this._router.events.subscribe((event: any) => {
      //lazyloading start
      if (event instanceof RouteConfigLoadStart) {
        console.log('loading ..')
        this.isLoading=true
        // this._spinner.show();
      }
      //lazy loading end
      else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading=false
        console.log('finished')
        // this._spinner.hide();
      }
    })

    window.addEventListener('load', () => {
      this.isLoading = false;
    });
  }
 
}
