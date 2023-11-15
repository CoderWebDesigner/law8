import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessActionPopupComponent } from './success-action-popup.component';

describe('SuccessActionPopupComponent', () => {
  let component: SuccessActionPopupComponent;
  let fixture: ComponentFixture<SuccessActionPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessActionPopupComponent]
    });
    fixture = TestBed.createComponent(SuccessActionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
