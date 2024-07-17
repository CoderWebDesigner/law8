import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityReportEditorComponent } from './activity-report-editor.component';

describe('ActivityReportEditorComponent', () => {
  let component: ActivityReportEditorComponent;
  let fixture: ComponentFixture<ActivityReportEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityReportEditorComponent]
    });
    fixture = TestBed.createComponent(ActivityReportEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
