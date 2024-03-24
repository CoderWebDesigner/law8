import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { NgOtpInputComponent } from 'ng-otp-input';

@Component({
  selector: 'app-formly-otp-field',
  templateUrl: './formly-otp-field.component.html',
  styleUrls: ['./formly-otp-field.component.scss']
})
export class FormlyOtpFieldComponent extends FieldType<FieldTypeConfig> implements AfterViewInit {
  @ViewChild(NgOtpInputComponent, { static: false}) ngOtpInput:NgOtpInputComponent;

  ngOnInit(): void {
    // console.log(this.formControl.value);
  }

  ngAfterViewInit(): void {
    if(this.formControl?.value) this.ngOtpInput.setValue(this.formControl?.value);
  }
}
