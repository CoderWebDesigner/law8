import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";


export function arabicLettersValidator(control: FormControl): ValidationErrors {
  return !control.value || /^[\u0621-\u064A\s\p{N}\s0-9]+$/.test(control.value) ? null : { 'arabicLetters': true };
}

export function englishLettersValidator(control: FormControl): ValidationErrors {
  return !control.value || /^[~`!@#$%^&*()_+=[\]\\{}|;':",.\/<>?a-zA-Z\s0-9-]+$/.test(control.value) ? null : { 'englishLetters': true };
}


export function emailValidator(control: FormControl): ValidationErrors {
  return !control.value || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(control.value) ? null : { 'email': true };
}
export function passwordValidator(control: FormControl): ValidationErrors {
  return !control.value ||/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(control.value) ? null : { 'password': true };
}
export function urlValidator(control: FormControl): ValidationErrors {
  return !control.value || /^(ftp|http|https):\/\/[^ "]+$/.test(control.value) ? null : { 'url': true };
}

