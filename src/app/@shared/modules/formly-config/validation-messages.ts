import { TranslateService } from "@ngx-translate/core";

export function formlyValidationConfig(translate: TranslateService) {
  return {
    validationMessages: [
      {
        name: 'required',
        message() {
          return translate.stream('validation.required');
        },
      },
      {
        name: 'arabicLetters',
        message() {
          return translate.stream('validation.arabicLetters');
        },
      },
      {
        name: 'englishLetters',
        message() {
          return translate.stream('validation.englishLetters');
        },
      },
      {
        name: 'email',
        message() {
          return translate.stream('validation.email');
        },
      },
      {
        name: 'url',
        message() {
          return translate.stream('validation.url');
        },
      },
      {
        name: 'password',
        message() {
          return translate.stream('validation.password');
        },
      },



    ],
  };
}
