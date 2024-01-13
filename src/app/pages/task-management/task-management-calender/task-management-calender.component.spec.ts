import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManagementCalenderComponent } from './task-management-calender.component';

describe('TaskManagementCalenderComponent', () => {
  let component: TaskManagementCalenderComponent;
  let fixture: ComponentFixture<TaskManagementCalenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskManagementCalenderComponent]
    });
    fixture = TestBed.createComponent(TaskManagementCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
