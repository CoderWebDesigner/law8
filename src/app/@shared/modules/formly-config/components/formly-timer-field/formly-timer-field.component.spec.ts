import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyTimerFieldComponent } from './formly-timer-field.component';

describe('FormlyTimerFieldComponent', () => {
  let component: FormlyTimerFieldComponent;
  let fixture: ComponentFixture<FormlyTimerFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyTimerFieldComponent]
    });
    fixture = TestBed.createComponent(FormlyTimerFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
