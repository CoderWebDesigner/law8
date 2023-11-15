import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlySelectButtonFieldComponent } from './formly-select-button-field.component';

describe('FormlySelectButtonFieldComponent', () => {
  let component: FormlySelectButtonFieldComponent;
  let fixture: ComponentFixture<FormlySelectButtonFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlySelectButtonFieldComponent]
    });
    fixture = TestBed.createComponent(FormlySelectButtonFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
