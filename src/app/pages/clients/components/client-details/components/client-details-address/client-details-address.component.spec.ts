import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailsAddressComponent } from './client-details-address.component';

describe('ClientDetailsAddressComponent', () => {
  let component: ClientDetailsAddressComponent;
  let fixture: ComponentFixture<ClientDetailsAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientDetailsAddressComponent]
    });
    fixture = TestBed.createComponent(ClientDetailsAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
