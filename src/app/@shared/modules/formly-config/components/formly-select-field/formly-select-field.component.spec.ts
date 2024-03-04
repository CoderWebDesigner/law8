import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlySelectFieldComponent } from './formly-select-field.component';

describe('FormlySelectFieldComponent', () => {
  let component: FormlySelectFieldComponent;
  let fixture: ComponentFixture<FormlySelectFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlySelectFieldComponent]
    });
    fixture = TestBed.createComponent(FormlySelectFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
