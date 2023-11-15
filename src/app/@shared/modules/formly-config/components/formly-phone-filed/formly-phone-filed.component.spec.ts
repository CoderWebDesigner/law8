import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyPhoneFiledComponent } from './formly-phone-filed.component';

describe('FormlyPhoneFiledComponent', () => {
  let component: FormlyPhoneFiledComponent;
  let fixture: ComponentFixture<FormlyPhoneFiledComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyPhoneFiledComponent]
    });
    fixture = TestBed.createComponent(FormlyPhoneFiledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
