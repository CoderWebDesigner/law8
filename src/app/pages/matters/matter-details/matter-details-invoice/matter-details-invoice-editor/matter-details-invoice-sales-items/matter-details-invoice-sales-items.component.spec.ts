import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterDetailsInvoiceSalesItemsComponent } from './matter-details-invoice-sales-items.component';

describe('MatterDetailsInvoiceSalesItemsComponent', () => {
  let component: MatterDetailsInvoiceSalesItemsComponent;
  let fixture: ComponentFixture<MatterDetailsInvoiceSalesItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterDetailsInvoiceSalesItemsComponent]
    });
    fixture = TestBed.createComponent(MatterDetailsInvoiceSalesItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
