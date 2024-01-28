import { FormlyUploadProfileFieldComponent } from './components/formly-upload-profile-field/formly-upload-profile-field.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule, FORMLY_CONFIG } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { arabicLettersValidator, emailValidator, englishLettersValidator, passwordValidator, urlValidator } from './custom-validation';
import { formlyValidationConfig } from './validation-messages';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormlyInputFieldComponent } from './components/formly-input-field/formly-input-field.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormlySelectFiledComponent } from './components/formly-select-filed/formly-select-filed.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormlyRadioButtonFiledComponent } from './components/formly-radio-button-filed/formly-radio-button-filed.component';
import { FormlyTextareaFiledComponent } from './components/formly-textarea-filed/formly-textarea-filed.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormlyDateFieldComponent } from './components/formly-date-field/formly-date-field.component';
import { FormlyButtonFieldComponent } from './components/formly-button-field/formly-button-field.component';
import { FormlySelectButtonFieldComponent } from './components/formly-select-button-field/formly-select-button-field.component';
import { FormlyPhoneFieldComponent } from './components/formly-phone-field/formly-phone-field.component';
import { FormlyOtpFieldComponent } from './components/formly-otp-field/formly-otp-field.component';

import { NgOtpInputModule } from 'ng-otp-input';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormlyPasswordFieldComponent } from './components/formly-password-field/formly-password-field.component';
import { PasswordModule } from 'primeng/password';
import { NgxIntlTelInputModule } from '@justin-s/ngx-intl-tel-input';
import { FormlyTableFieldComponent } from './components/formly-table-field/formly-table-field.component';
import { TableModule } from 'primeng/table';
import { FormlyTimerFieldComponent } from './components/formly-timer-field/formly-timer-field.component';
import { FormlyMultiSelectFieldComponent } from './components/formly-multi-select-field/formly-multi-select-field.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { FormlyCheckboxFieldComponent } from './components/formly-checkbox-field/formly-checkbox-field.component';
import { FormlyFileFieldComponent } from './components/formly-file-field/formly-file-field.component';
import { NgxDropzoneModule } from 'ngx-dropzone-compressing';

@NgModule({
  declarations: [
    FormlyInputFieldComponent,
    FormlySelectFiledComponent,
    FormlyRadioButtonFiledComponent,
    FormlyTextareaFiledComponent,
    FormlyDateFieldComponent,
    FormlyButtonFieldComponent,
    FormlySelectButtonFieldComponent,
    FormlyUploadProfileFieldComponent,
    FormlyUploadProfileFieldComponent,
    FormlyPhoneFieldComponent,
    FormlyFileFieldComponent,
    FormlyOtpFieldComponent,
    FormlyPasswordFieldComponent,
    FormlyTableFieldComponent,
    FormlyTimerFieldComponent,
    FormlyMultiSelectFieldComponent,
    FormlyCheckboxFieldComponent
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
        { name: 'input', component: FormlyInputFieldComponent },
        { name: 'select', component: FormlySelectFiledComponent },
        { name: 'radio', component: FormlyRadioButtonFiledComponent },
        { name: 'textarea', component: FormlyTextareaFiledComponent },
        { name: 'date', component: FormlyDateFieldComponent, extends: 'input' },
        { name: 'button', component: FormlyButtonFieldComponent },
        { name: 'select-button', component: FormlySelectButtonFieldComponent, extends: 'input' },
        { name: 'phone', component: FormlyPhoneFieldComponent, extends: 'input' },
        { name: 'file', component: FormlyFileFieldComponent , extends: 'input'},
        { name: 'attachment', component: FormlyUploadProfileFieldComponent, extends: 'input' },
        { name: 'otp', component: FormlyOtpFieldComponent, extends: 'input' },
        { name: 'password', component: FormlyPasswordFieldComponent, extends: 'input' },
        { name: 'table', component: FormlyTableFieldComponent },
        { name: 'timer', component: FormlyTimerFieldComponent },
        { name: 'multi-select', component: FormlyMultiSelectFieldComponent , extends: 'input'},
        { name: 'checkbox', component: FormlyCheckboxFieldComponent },

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
    NgxDropzoneModule,
    NgxIntlTelInputModule,
    NgOtpInputModule,
    SelectButtonModule,
    PasswordModule,
    TableModule,
    MultiSelectModule,
    CheckboxModule
  ],
  exports: [
    ReactiveFormsModule,
    FormlyModule,
    NgxDropzoneModule

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
