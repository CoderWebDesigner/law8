import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPortalChangePasswordComponent } from './client-portal-change-password.component';

describe('ClientPortalChangePasswordComponent', () => {
  let component: ClientPortalChangePasswordComponent;
  let fixture: ComponentFixture<ClientPortalChangePasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientPortalChangePasswordComponent]
    });
    fixture = TestBed.createComponent(ClientPortalChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
