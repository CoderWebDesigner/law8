import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityCalenderComponent } from './security-calender.component';

describe('SecurityCalenderComponent', () => {
  let component: SecurityCalenderComponent;
  let fixture: ComponentFixture<SecurityCalenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SecurityCalenderComponent]
    });
    fixture = TestBed.createComponent(SecurityCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
