import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityGroupsComponent } from './security-groups.component';

describe('SecurityGroupsComponent', () => {
  let component: SecurityGroupsComponent;
  let fixture: ComponentFixture<SecurityGroupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityGroupsComponent]
    });
    fixture = TestBed.createComponent(SecurityGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
