import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterBillingRateExceptionComponent } from './matter-billing-rate-exception.component';

describe('MatterBillingRateExceptionComponent', () => {
  let component: MatterBillingRateExceptionComponent;
  let fixture: ComponentFixture<MatterBillingRateExceptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterBillingRateExceptionComponent]
    });
    fixture = TestBed.createComponent(MatterBillingRateExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
