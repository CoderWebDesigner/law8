import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEditorComponent } from './contact-editor.component';

describe('ContactEditorComponent', () => {
  let component: ContactEditorComponent;
  let fixture: ComponentFixture<ContactEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactEditorComponent]
    });
    fixture = TestBed.createComponent(ContactEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
