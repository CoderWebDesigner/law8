import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyButtonFiledComponent } from './formly-button-filed.component';

describe('FormlyButtonFiledComponent', () => {
  let component: FormlyButtonFiledComponent;
  let fixture: ComponentFixture<FormlyButtonFiledComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyButtonFiledComponent]
    });
    fixture = TestBed.createComponent(FormlyButtonFiledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
