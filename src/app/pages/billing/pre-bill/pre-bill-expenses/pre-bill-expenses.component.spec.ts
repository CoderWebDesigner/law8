import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreBillExpensesComponent } from './pre-bill-expenses.component';

describe('PreBillExpensesComponent', () => {
  let component: PreBillExpensesComponent;
  let fixture: ComponentFixture<PreBillExpensesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreBillExpensesComponent]
    });
    fixture = TestBed.createComponent(PreBillExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
