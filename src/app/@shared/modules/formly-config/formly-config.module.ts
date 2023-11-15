import { FormlyUploadProfileFieldComponent } from './components/formly-upload-profile-field/formly-upload-profile-field.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule, FORMLY_CONFIG } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { arabicLettersValidator, emailValidator, englishLettersValidator, passwordValidator, urlValidator } from './custom-validation';
import { formlyValidationConfig } from './validation-messages';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormlyInputFiledComponent } from './components/formly-input-filed/formly-input-filed.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormlySelectFiledComponent } from './components/formly-select-filed/formly-select-filed.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormlyRadioButtonFiledComponent } from './components/formly-radio-button-filed/formly-radio-button-filed.component';
import { FormlyTextareaFiledComponent } from './components/formly-textarea-filed/formly-textarea-filed.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormlyDateFiledComponent } from './components/formly-date-filed/formly-date-filed.component';
import { FormlyButtonFiledComponent } from './components/formly-button-filed/formly-button-filed.component';
import { FormlySelectButtonFieldComponent } from './components/formly-select-button-field/formly-select-button-field.component';
import { FormlyPhoneFiledComponent } from './components/formly-phone-filed/formly-phone-filed.component';
import { FormlyOtpFiledComponent } from './components/formly-otp-filed/formly-otp-filed.component';
import { FormlyFileFiledComponent } from './components/formly-file-filed/formly-file-filed.component';
// import { NgxIntlTelInputModule } from '@justin-s/ngx-intl-tel-input';
// import { NgxDropzoneModule } from 'ngx-dropzone-compressing';
import { NgOtpInputModule } from  'ng-otp-input';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormlyPasswordFiledComponent } from './components/formly-password-filed/formly-password-filed.component';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [
    FormlyInputFiledComponent,
    FormlySelectFiledComponent,
    FormlyRadioButtonFiledComponent,
    FormlyTextareaFiledComponent,
    FormlyDateFiledComponent,
    FormlyButtonFiledComponent,
    FormlySelectButtonFieldComponent,
    FormlyUploadProfileFieldComponent,
    FormlyUploadProfileFieldComponent,
    FormlyPhoneFiledComponent,
    FormlyFileFiledComponent,
    FormlyOtpFiledComponent,
    FormlyPasswordFiledComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      validators: [
        { name: 'arabicLetters', validation: arabicLettersValidator },
        { name: 'englishLetters', validation: englishLettersValidator },
        { name: 'email', validation: emailValidator },
        { name: 'password', validation: passwordValidator },
        { name: 'url', validation: urlValidator },
      ],
      types: [
        { name: 'input', component: FormlyInputFiledComponent },
        { name: 'select', component: FormlySelectFiledComponent },
        { name: 'radio', component: FormlyRadioButtonFiledComponent },
        { name: 'textarea', component: FormlyTextareaFiledComponent },
        { name: 'date', component: FormlyDateFiledComponent, extends: 'input' },
        { name: 'button', component: FormlyButtonFiledComponent },
        { name: 'select-button', component: FormlySelectButtonFieldComponent, extends: 'input' },
        // { name: 'attachment', component: FormlyUploadProfileFieldComponent, extends: 'input' },
        { name: 'phone', component: FormlyPhoneFiledComponent, extends: 'input' },
        // { name: 'file', component: FormlyFileFiledComponent , extends: 'input'},
        { name: 'otp', component: FormlyOtpFiledComponent,extends: 'input'},
        { name: 'password', component: FormlyPasswordFiledComponent,extends: 'input'}

      ]
    }),

    FormlyPrimeNGModule,
    TranslateModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    RadioButtonModule,
    InputTextareaModule,
    CalendarModule,
    // NgxDropzoneModule,
    // NgxIntlTelInputModule,
    NgOtpInputModule,
    SelectButtonModule,
    PasswordModule
  ],
  exports: [
    ReactiveFormsModule,
    FormlyModule,
    // NgxDropzoneModule

  ],
  providers: [
    {
      provide: FORMLY_CONFIG,
      multi: true,
      useFactory: formlyValidationConfig,
      deps: [TranslateService],
    },
  ],
})
export class FormlyConfigModule { }
