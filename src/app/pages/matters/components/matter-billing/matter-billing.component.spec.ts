import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterBillingComponent } from './matter-billing.component';

describe('MatterBillingComponent', () => {
  let component: MatterBillingComponent;
  let fixture: ComponentFixture<MatterBillingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterBillingComponent]
    });
    fixture = TestBed.createComponent(MatterBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
