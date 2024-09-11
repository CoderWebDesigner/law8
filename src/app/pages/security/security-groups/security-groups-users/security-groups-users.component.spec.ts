import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityGroupsUsersComponent } from './security-groups-users.component';

describe('SecurityGroupsUsersComponent', () => {
  let component: SecurityGroupsUsersComponent;
  let fixture: ComponentFixture<SecurityGroupsUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityGroupsUsersComponent]
    });
    fixture = TestBed.createComponent(SecurityGroupsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
