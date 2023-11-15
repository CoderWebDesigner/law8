import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedActionsComponent } from './shared-actions.component';

describe('SharedActionsComponent', () => {
  let component: SharedActionsComponent;
  let fixture: ComponentFixture<SharedActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedActionsComponent],
    });
    fixture = TestBed.createComponent(SharedActionsComponent);
    component = fixture.componentInstance;
    SharedActionsComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
