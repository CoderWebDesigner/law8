import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlySwitchFieldComponent } from './formly-switch-field.component';

describe('FormlySwitchFieldComponent', () => {
  let component: FormlySwitchFieldComponent;
  let fixture: ComponentFixture<FormlySwitchFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlySwitchFieldComponent]
    });
    fixture = TestBed.createComponent(FormlySwitchFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
