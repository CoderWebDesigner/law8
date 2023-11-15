import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyTextareaFiledComponent } from './formly-textarea-filed.component';

describe('FormlyTextareaFiledComponent', () => {
  let component: FormlyTextareaFiledComponent;
  let fixture: ComponentFixture<FormlyTextareaFiledComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyTextareaFiledComponent]
    });
    fixture = TestBed.createComponent(FormlyTextareaFiledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
