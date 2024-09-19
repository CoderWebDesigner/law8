import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetReportEditorComponent } from './timesheet-report-editor.component';

describe('TimesheetReportEditorComponent', () => {
  let component: TimesheetReportEditorComponent;
  let fixture: ComponentFixture<TimesheetReportEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimesheetReportEditorComponent]
    });
    fixture = TestBed.createComponent(TimesheetReportEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
