import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyRadioButtonFiledComponent } from './formly-radio-button-filed.component';

describe('FormlyRadioButtonFiledComponent', () => {
  let component: FormlyRadioButtonFiledComponent;
  let fixture: ComponentFixture<FormlyRadioButtonFiledComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyRadioButtonFiledComponent]
    });
    fixture = TestBed.createComponent(FormlyRadioButtonFiledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
