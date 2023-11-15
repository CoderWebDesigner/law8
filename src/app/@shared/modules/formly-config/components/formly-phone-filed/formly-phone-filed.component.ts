import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { CountryISO, PhoneNumberFormat, SearchCountryField } from '@justin-s/ngx-intl-tel-input';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
@Component({
	selector: 'app-formly-phone-filed',
	templateUrl: './formly-phone-filed.component.html',
	styleUrls: ['./formly-phone-filed.component.scss']
})
export class FormlyPhoneFiledComponent extends FieldType<FieldTypeConfig> {
	// separateDialCode = false;
	// SearchCountryField = SearchCountryField;
	// CountryISO = CountryISO;
	// PhoneNumberFormat = PhoneNumberFormat;
	// preferredCountries: CountryISO[] = [CountryISO.Egypt];

}
