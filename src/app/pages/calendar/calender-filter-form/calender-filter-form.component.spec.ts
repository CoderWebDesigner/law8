import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderFilterFormComponent } from './calender-filter-form.component';

describe('CalenderFilterFormComponent', () => {
  let component: CalenderFilterFormComponent;
  let fixture: ComponentFixture<CalenderFilterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalenderFilterFormComponent]
    });
    fixture = TestBed.createComponent(CalenderFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
