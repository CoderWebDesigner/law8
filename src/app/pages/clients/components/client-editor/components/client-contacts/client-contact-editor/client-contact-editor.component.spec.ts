import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientContactEditorComponent } from './client-contact-editor.component';

describe('ClientContactEditorComponent', () => {
  let component: ClientContactEditorComponent;
  let fixture: ComponentFixture<ClientContactEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientContactEditorComponent]
    });
    fixture = TestBed.createComponent(ClientContactEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
