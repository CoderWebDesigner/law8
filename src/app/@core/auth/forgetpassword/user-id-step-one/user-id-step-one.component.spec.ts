import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIdStepOneComponent } from './user-id-step-one.component';

describe('UserIdStepOneComponent', () => {
  let component: UserIdStepOneComponent;
  let fixture: ComponentFixture<UserIdStepOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserIdStepOneComponent]
    });
    fixture = TestBed.createComponent(UserIdStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
