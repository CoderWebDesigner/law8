import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingExpensesEditorComponent } from './billing-expenses-editor.component';

describe('BillingExpensesEditorComponent', () => {
  let component: BillingExpensesEditorComponent;
  let fixture: ComponentFixture<BillingExpensesEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BillingExpensesEditorComponent]
    });
    fixture = TestBed.createComponent(BillingExpensesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
