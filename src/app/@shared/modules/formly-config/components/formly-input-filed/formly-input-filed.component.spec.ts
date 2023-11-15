import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyInputFiledComponent } from './formly-input-filed.component';

describe('FormlyInputFiledComponent', () => {
  let component: FormlyInputFiledComponent;
  let fixture: ComponentFixture<FormlyInputFiledComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyInputFiledComponent]
    });
    fixture = TestBed.createComponent(FormlyInputFiledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
