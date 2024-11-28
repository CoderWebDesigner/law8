import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreBillSummaryComponent } from './pre-bill-summary.component';

describe('PreBillSummaryComponent', () => {
  let component: PreBillSummaryComponent;
  let fixture: ComponentFixture<PreBillSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreBillSummaryComponent]
    });
    fixture = TestBed.createComponent(PreBillSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
