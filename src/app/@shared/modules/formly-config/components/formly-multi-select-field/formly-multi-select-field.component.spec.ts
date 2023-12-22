import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyMultiSelectFieldComponent } from './formly-multi-select-field.component';

describe('FormlyMultiSelectFieldComponent', () => {
  let component: FormlyMultiSelectFieldComponent;
  let fixture: ComponentFixture<FormlyMultiSelectFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyMultiSelectFieldComponent]
    });
    fixture = TestBed.createComponent(FormlyMultiSelectFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
