import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientContactsComponent } from './client-contacts.component';

describe('ClientContactsComponent', () => {
  let component: ClientContactsComponent;
  let fixture: ComponentFixture<ClientContactsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientContactsComponent]
    });
    fixture = TestBed.createComponent(ClientContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
