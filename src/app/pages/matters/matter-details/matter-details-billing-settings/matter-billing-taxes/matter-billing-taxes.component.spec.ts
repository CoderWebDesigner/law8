import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterBillingTaxesComponent } from './matter-billing-taxes.component';

describe('MatterBillingTaxesComponent', () => {
  let component: MatterBillingTaxesComponent;
  let fixture: ComponentFixture<MatterBillingTaxesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterBillingTaxesComponent]
    });
    fixture = TestBed.createComponent(MatterBillingTaxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
