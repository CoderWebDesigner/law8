import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAddBillingAddressComponent } from './client-add-billing-address.component';

describe('ClientAddBillingAddressComponent', () => {
  let component: ClientAddBillingAddressComponent;
  let fixture: ComponentFixture<ClientAddBillingAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientAddBillingAddressComponent]
    });
    fixture = TestBed.createComponent(ClientAddBillingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
