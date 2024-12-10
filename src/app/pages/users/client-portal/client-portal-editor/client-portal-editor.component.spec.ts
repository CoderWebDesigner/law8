import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPortalEditorComponent } from './client-portal-editor.component';

describe('ClientPortalEditorComponent', () => {
  let component: ClientPortalEditorComponent;
  let fixture: ComponentFixture<ClientPortalEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClientPortalEditorComponent]
    });
    fixture = TestBed.createComponent(ClientPortalEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
