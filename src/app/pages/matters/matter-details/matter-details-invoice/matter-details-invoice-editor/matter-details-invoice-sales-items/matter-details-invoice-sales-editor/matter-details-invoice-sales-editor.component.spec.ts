import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterDetailsInvoiceSalesEditorComponent } from './matter-details-invoice-sales-editor.component';

describe('MatterDetailsInvoiceSalesEditorComponent', () => {
  let component: MatterDetailsInvoiceSalesEditorComponent;
  let fixture: ComponentFixture<MatterDetailsInvoiceSalesEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterDetailsInvoiceSalesEditorComponent]
    });
    fixture = TestBed.createComponent(MatterDetailsInvoiceSalesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
