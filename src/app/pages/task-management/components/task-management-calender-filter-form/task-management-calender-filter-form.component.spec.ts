import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManagementCalenderFilterFormComponent } from './task-management-calender-filter-form.component';

describe('TaskManagementCalenderFilterFormComponent', () => {
  let component: TaskManagementCalenderFilterFormComponent;
  let fixture: ComponentFixture<TaskManagementCalenderFilterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskManagementCalenderFilterFormComponent]
    });
    fixture = TestBed.createComponent(TaskManagementCalenderFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
