import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { NgOtpInputComponent } from 'ng-otp-input';

@Component({
  selector: 'app-formly-otp-filed',
  templateUrl: './formly-otp-filed.component.html',
  styleUrls: ['./formly-otp-filed.component.scss']
})
export class FormlyOtpFiledComponent extends FieldType<FieldTypeConfig> implements AfterViewInit {
  @ViewChild(NgOtpInputComponent, { static: false}) ngOtpInput:NgOtpInputComponent;

  ngOnInit(): void {
    console.log(this.formControl.value);
  }

  ngAfterViewInit(): void {
    console.log(this.ngOtpInput);
    if(this.formControl?.value) this.ngOtpInput.setValue(this.formControl?.value);

  }
}
