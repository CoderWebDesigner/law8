import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAddContactsComponent } from './client-add-contacts.component';

describe('ClientAddContactsComponent', () => {
  let component: ClientAddContactsComponent;
  let fixture: ComponentFixture<ClientAddContactsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientAddContactsComponent]
    });
    fixture = TestBed.createComponent(ClientAddContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
