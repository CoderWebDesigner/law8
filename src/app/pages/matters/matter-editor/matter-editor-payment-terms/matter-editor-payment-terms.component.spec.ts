import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterEditorPaymentTermsComponent } from './matter-editor-payment-terms.component';

describe('MatterEditorPaymentTermsComponent', () => {
  let component: MatterEditorPaymentTermsComponent;
  let fixture: ComponentFixture<MatterEditorPaymentTermsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterEditorPaymentTermsComponent]
    });
    fixture = TestBed.createComponent(MatterEditorPaymentTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
