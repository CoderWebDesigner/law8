import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAddressEditorComponent } from './client-address-editor.component';

describe('ClientAddressEditorComponent', () => {
  let component: ClientAddressEditorComponent;
  let fixture: ComponentFixture<ClientAddressEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientAddressEditorComponent]
    });
    fixture = TestBed.createComponent(ClientAddressEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
