import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpBackend, HttpClientModule } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppHttpInterceptor } from '@core/interceptors';
import { HttpErrorInterceptor } from '@core/interceptors/http-error.interceptor';
import { HandleErrorService } from '@core/services/handle-error-service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LanguageService } from '@core/services';


export function HttpLoaderFactory(httpBackend: HttpBackend) {
  return new MultiTranslateHttpLoader(httpBackend, [
    './assets/i18n/auth/',
    './assets/i18n/common/',
    './assets/i18n/menu/',
    './assets/i18n/pages/dashboard/',
    './assets/i18n/pages/client/',
    './assets/i18n/pages/timesheet/',
    './assets/i18n/pages/matters/',
    './assets/i18n/pages/task-management/',
    './assets/i18n/pages/profile/',
    './assets/i18n/pages/user/',
    './assets/i18n/pages/lookups/',
    './assets/i18n/pages/security/',
    './assets/i18n/pages/report/',
    './assets/i18n/pages/search/',
    './assets/i18n/pages/setting/',
    './assets/i18n/pages/billing/',
  ]);
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ProgressSpinnerModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend],
      },
    }),

    LayoutModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
      deps: [HandleErrorService]

    },
    {
      provide: APP_INITIALIZER,
      useFactory: appConfigFactory,
      deps: [LanguageService],
      multi: true,
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function appConfigFactory(_languageService: LanguageService) {
  return () => _languageService.initLang();
}