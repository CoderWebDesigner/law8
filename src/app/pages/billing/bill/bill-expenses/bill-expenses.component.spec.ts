import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillExpensesComponent } from './bill-expenses.component';

describe('BillExpensesComponent', () => {
  let component: BillExpensesComponent;
  let fixture: ComponentFixture<BillExpensesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillExpensesComponent]
    });
    fixture = TestBed.createComponent(BillExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
