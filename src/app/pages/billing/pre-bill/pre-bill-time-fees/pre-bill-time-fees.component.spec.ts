import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreBillTimeFeesComponent } from './pre-bill-time-fees.component';

describe('PreBillTimeFeesComponent', () => {
  let component: PreBillTimeFeesComponent;
  let fixture: ComponentFixture<PreBillTimeFeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreBillTimeFeesComponent]
    });
    fixture = TestBed.createComponent(PreBillTimeFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
