import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyOtpFieldComponent } from './formly-otp-field.component';

describe('FormlyOtpFieldComponent', () => {
  let component: FormlyOtpFieldComponent;
  let fixture: ComponentFixture<FormlyOtpFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyOtpFieldComponent]
    });
    fixture = TestBed.createComponent(FormlyOtpFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
