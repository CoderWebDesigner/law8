import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterDetailsInvoiceEditorComponent } from './matter-details-invoice-editor.component';

describe('MatterDetailsInvoiceEditorComponent', () => {
  let component: MatterDetailsInvoiceEditorComponent;
  let fixture: ComponentFixture<MatterDetailsInvoiceEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterDetailsInvoiceEditorComponent]
    });
    fixture = TestBed.createComponent(MatterDetailsInvoiceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
