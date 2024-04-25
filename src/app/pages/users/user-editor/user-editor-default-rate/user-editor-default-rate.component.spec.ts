import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditorDefaultRateComponent } from './user-editor-default-rate.component';

describe('UserEditorDefaultRateComponent', () => {
  let component: UserEditorDefaultRateComponent;
  let fixture: ComponentFixture<UserEditorDefaultRateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEditorDefaultRateComponent]
    });
    fixture = TestBed.createComponent(UserEditorDefaultRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
