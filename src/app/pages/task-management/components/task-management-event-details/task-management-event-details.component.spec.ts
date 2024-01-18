import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManagementEventDetailsComponent } from './task-management-event-details.component';

describe('TaskManagementEventDetailsComponent', () => {
  let component: TaskManagementEventDetailsComponent;
  let fixture: ComponentFixture<TaskManagementEventDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskManagementEventDetailsComponent]
    });
    fixture = TestBed.createComponent(TaskManagementEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
