import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordStepThreeComponent } from './new-password-step-three.component';

describe('NewPasswordStepThreeComponent', () => {
  let component: NewPasswordStepThreeComponent;
  let fixture: ComponentFixture<NewPasswordStepThreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPasswordStepThreeComponent]
    });
    fixture = TestBed.createComponent(NewPasswordStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
