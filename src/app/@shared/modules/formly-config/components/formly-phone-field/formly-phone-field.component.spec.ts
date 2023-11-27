import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyPhoneFieldComponent } from './formly-phone-field.component';

describe('FormlyPhoneFieldComponent', () => {
  let component: FormlyPhoneFieldComponent;
  let fixture: ComponentFixture<FormlyPhoneFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyPhoneFieldComponent]
    });
    fixture = TestBed.createComponent(FormlyPhoneFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
