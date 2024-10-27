import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from '@justin-s/ngx-intl-tel-input';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { getCountryCallingCode, isValidNumber, parse } from 'libphonenumber-js';
@Component({
	selector: 'app-formly-phone-field',
	templateUrl: './formly-phone-field.component.html',
	styleUrls: ['./formly-phone-field.component.scss']
})
export class FormlyPhoneFieldComponent extends FieldType<FieldTypeConfig> {
	// separateDialCode = false;
	// SearchCountryField = SearchCountryField;
	// CountryISO = CountryISO;
	// PhoneNumberFormat = PhoneNumberFormat;
	// preferredCountries: CountryISO[] = [CountryISO.UnitedArabEmirates];
	@ViewChild('telInput') telInput: any;
	_cdr = inject(ChangeDetectorRef);
	iti: any

	onKeyUp(e: any) {
		if (e) {
			const value = this.formControl.value;
			try {
				// Parse the phone number with 'EG' as the default country.
				const parsedNumber = parse(value, 'EG');
	
				// Validate the parsed number and ensure the country code is correct.
				const isValid = isValidNumber(parsedNumber) && getCountryCallingCode(parsedNumber.country) === '20';
				
				if (!value || isValid) {
					this.formControl.setErrors(null); // Clear any previous validation errors
				} else {
					this.formControl.setErrors({ 'invalidPhoneNumber': true }); // Set validation error
				}
				this._cdr.detectChanges();
			} catch (error) {
				// Handle parsing errors and set validation error
				this.formControl.setErrors({ 'invalidPhoneNumber': true });
				this._cdr.detectChanges();
			}
		}
	}
}
