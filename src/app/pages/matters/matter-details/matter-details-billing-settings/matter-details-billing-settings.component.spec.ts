import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterDetailsBillingSettingsComponent } from './matter-details-billing-settings.component';

describe('MatterDetailsBillingSettingsComponent', () => {
  let component: MatterDetailsBillingSettingsComponent;
  let fixture: ComponentFixture<MatterDetailsBillingSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterDetailsBillingSettingsComponent]
    });
    fixture = TestBed.createComponent(MatterDetailsBillingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
