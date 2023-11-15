import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyPasswordFiledComponent } from './formly-password-filed.component';

describe('FormlyPasswordFiledComponent', () => {
  let component: FormlyPasswordFiledComponent;
  let fixture: ComponentFixture<FormlyPasswordFiledComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyPasswordFiledComponent]
    });
    fixture = TestBed.createComponent(FormlyPasswordFiledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
