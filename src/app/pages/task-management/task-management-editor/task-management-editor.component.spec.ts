import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManagementEditorComponent } from './task-management-editor.component';

describe('TaskManagementEditorComponent', () => {
  let component: TaskManagementEditorComponent;
  let fixture: ComponentFixture<TaskManagementEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskManagementEditorComponent]
    });
    fixture = TestBed.createComponent(TaskManagementEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
