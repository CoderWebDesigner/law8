import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyDateFieldComponent } from './formly-date-field.component';

describe('FormlyDateFieldComponent', () => {
  let component: FormlyDateFieldComponent;
  let fixture: ComponentFixture<FormlyDateFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyDateFieldComponent]
    });
    fixture = TestBed.createComponent(FormlyDateFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
