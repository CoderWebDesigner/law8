import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillTimeFeesComponent } from './bill-time-fees.component';

describe('BillTimeFeesComponent', () => {
  let component: BillTimeFeesComponent;
  let fixture: ComponentFixture<BillTimeFeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillTimeFeesComponent]
    });
    fixture = TestBed.createComponent(BillTimeFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
