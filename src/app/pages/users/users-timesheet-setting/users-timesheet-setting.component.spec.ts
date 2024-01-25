import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTimesheetSettingComponent } from './users-timesheet-setting.component';

describe('UsersTimesheetSettingComponent', () => {
  let component: UsersTimesheetSettingComponent;
  let fixture: ComponentFixture<UsersTimesheetSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersTimesheetSettingComponent]
    });
    fixture = TestBed.createComponent(UsersTimesheetSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
