import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyUploadProfileFieldComponent } from '@shared/modules/formly-config/components/formly-attachment-field/formly-attachment-field.component';

describe('FormlyUploadProfileFieldComponent', () => {
  let component: FormlyUploadProfileFieldComponent;
  let fixture: ComponentFixture<FormlyUploadProfileFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyUploadProfileFieldComponent]
    });
    fixture = TestBed.createComponent(FormlyUploadProfileFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
