import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyEditorFiledComponent } from './formly-editor-filed.component';

describe('FormlyEditorFiledComponent', () => {
  let component: FormlyEditorFiledComponent;
  let fixture: ComponentFixture<FormlyEditorFiledComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyEditorFiledComponent]
    });
    fixture = TestBed.createComponent(FormlyEditorFiledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
