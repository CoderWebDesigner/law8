import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEditorContactsComponent } from './client-editor-contacts.component';

describe('ClientEditorContactsComponent', () => {
  let component: ClientEditorContactsComponent;
  let fixture: ComponentFixture<ClientEditorContactsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientEditorContactsComponent]
    });
    fixture = TestBed.createComponent(ClientEditorContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
