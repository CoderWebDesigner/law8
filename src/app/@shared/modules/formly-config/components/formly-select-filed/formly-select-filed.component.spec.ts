import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlySelectFiledComponent } from './formly-select-filed.component';

describe('FormlySelectFiledComponent', () => {
  let component: FormlySelectFiledComponent;
  let fixture: ComponentFixture<FormlySelectFiledComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlySelectFiledComponent]
    });
    fixture = TestBed.createComponent(FormlySelectFiledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
