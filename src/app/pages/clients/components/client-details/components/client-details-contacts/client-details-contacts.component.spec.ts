import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailsContactsComponent } from './client-details-contacts.component';

describe('ClientDetailsContactsComponent', () => {
  let component: ClientDetailsContactsComponent;
  let fixture: ComponentFixture<ClientDetailsContactsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientDetailsContactsComponent]
    });
    fixture = TestBed.createComponent(ClientDetailsContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
