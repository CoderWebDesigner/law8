import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityUsersGroupsComponent } from './security-users-groups.component';

describe('SecurityUsersGroupsComponent', () => {
  let component: SecurityUsersGroupsComponent;
  let fixture: ComponentFixture<SecurityUsersGroupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityUsersGroupsComponent]
    });
    fixture = TestBed.createComponent(SecurityUsersGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
