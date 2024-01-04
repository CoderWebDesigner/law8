import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterDetailsInvoiceComponent } from './matter-details-invoice.component';

describe('MatterDetailsInvoiceComponent', () => {
  let component: MatterDetailsInvoiceComponent;
  let fixture: ComponentFixture<MatterDetailsInvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterDetailsInvoiceComponent]
    });
    fixture = TestBed.createComponent(MatterDetailsInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
