import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyCheckboxFieldComponent } from './formly-checkbox-field.component';

describe('FormlyCheckboxFieldComponent', () => {
  let component: FormlyCheckboxFieldComponent;
  let fixture: ComponentFixture<FormlyCheckboxFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyCheckboxFieldComponent]
    });
    fixture = TestBed.createComponent(FormlyCheckboxFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
