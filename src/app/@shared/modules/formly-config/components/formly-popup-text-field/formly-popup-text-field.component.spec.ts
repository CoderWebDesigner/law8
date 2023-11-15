import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyPopupTextFieldComponent } from './formly-popup-text-field.component';

describe('FormlyPopupTextFieldComponent', () => {
  let component: FormlyPopupTextFieldComponent;
  let fixture: ComponentFixture<FormlyPopupTextFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyPopupTextFieldComponent]
    });
    fixture = TestBed.createComponent(FormlyPopupTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
