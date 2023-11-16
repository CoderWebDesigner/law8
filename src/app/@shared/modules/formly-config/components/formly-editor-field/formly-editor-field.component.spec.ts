import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyEditorFieldComponent } from './formly-editor-field.component';

describe('FormlyEditorFieldComponent', () => {
  let component: FormlyEditorFieldComponent;
  let fixture: ComponentFixture<FormlyEditorFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyEditorFieldComponent]
    });
    fixture = TestBed.createComponent(FormlyEditorFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
