import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyDateFiledComponent } from './formly-date-filed.component';

describe('FormlyDateFiledComponent', () => {
  let component: FormlyDateFiledComponent;
  let fixture: ComponentFixture<FormlyDateFiledComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyDateFiledComponent]
    });
    fixture = TestBed.createComponent(FormlyDateFiledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
