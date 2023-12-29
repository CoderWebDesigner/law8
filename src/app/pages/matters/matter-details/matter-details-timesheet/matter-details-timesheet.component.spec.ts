import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterDetailsTimesheetComponent } from './matter-details-timesheet.component';

describe('MatterDetailsTimesheetComponent', () => {
  let component: MatterDetailsTimesheetComponent;
  let fixture: ComponentFixture<MatterDetailsTimesheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterDetailsTimesheetComponent]
    });
    fixture = TestBed.createComponent(MatterDetailsTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
