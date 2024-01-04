import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetFormlyEditorComponent } from './timesheet-formly-editor.component';

describe('TimesheetFormlyEditorComponent', () => {
  let component: TimesheetFormlyEditorComponent;
  let fixture: ComponentFixture<TimesheetFormlyEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimesheetFormlyEditorComponent]
    });
    fixture = TestBed.createComponent(TimesheetFormlyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
