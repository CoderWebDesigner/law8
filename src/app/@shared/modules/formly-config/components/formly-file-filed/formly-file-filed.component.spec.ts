import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFileFiledComponent } from './formly-file-filed.component';

describe('FormlyFileFiledComponent', () => {
  let component: FormlyFileFiledComponent;
  let fixture: ComponentFixture<FormlyFileFiledComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyFileFiledComponent]
    });
    fixture = TestBed.createComponent(FormlyFileFiledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
