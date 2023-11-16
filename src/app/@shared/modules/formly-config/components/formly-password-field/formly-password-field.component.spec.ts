import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyPasswordFieldComponent } from './formly-password-field.component';

describe('FormlyPasswordFieldComponent', () => {
  let component: FormlyPasswordFieldComponent;
  let fixture: ComponentFixture<FormlyPasswordFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyPasswordFieldComponent]
    });
    fixture = TestBed.createComponent(FormlyPasswordFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
