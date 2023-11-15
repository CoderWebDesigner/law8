import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyOtpFiledComponent } from './formly-otp-filed.component';

describe('FormlyOtpFiledComponent', () => {
  let component: FormlyOtpFiledComponent;
  let fixture: ComponentFixture<FormlyOtpFiledComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyOtpFiledComponent]
    });
    fixture = TestBed.createComponent(FormlyOtpFiledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
