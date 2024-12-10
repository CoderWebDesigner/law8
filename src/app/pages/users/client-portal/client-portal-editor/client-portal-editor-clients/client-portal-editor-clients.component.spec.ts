import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPortalEditorClientsComponent } from './client-portal-editor-clients.component';

describe('ClientPortalEditorClientsComponent', () => {
  let component: ClientPortalEditorClientsComponent;
  let fixture: ComponentFixture<ClientPortalEditorClientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClientPortalEditorClientsComponent]
    });
    fixture = TestBed.createComponent(ClientPortalEditorClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
