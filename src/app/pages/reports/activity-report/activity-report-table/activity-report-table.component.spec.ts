import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityReportTableComponent } from './activity-report-table.component';

describe('ActivityReportTableComponent', () => {
  let component: ActivityReportTableComponent;
  let fixture: ComponentFixture<ActivityReportTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityReportTableComponent]
    });
    fixture = TestBed.createComponent(ActivityReportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
