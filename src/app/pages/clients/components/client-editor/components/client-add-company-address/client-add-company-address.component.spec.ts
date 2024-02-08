import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAddCompanyAddressComponent } from './client-add-company-address.component';

describe('ClientAddCompanyAddressComponent', () => {
  let component: ClientAddCompanyAddressComponent;
  let fixture: ComponentFixture<ClientAddCompanyAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientAddCompanyAddressComponent]
    });
    fixture = TestBed.createComponent(ClientAddCompanyAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
