import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from '@justin-s/ngx-intl-tel-input';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
@Component({
	selector: 'app-formly-phone-field',
	templateUrl: './formly-phone-field.component.html',
	styleUrls: ['./formly-phone-field.component.scss']
})
export class FormlyPhoneFieldComponent extends FieldType<FieldTypeConfig> {
	separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
	PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedArabEmirates];
}
