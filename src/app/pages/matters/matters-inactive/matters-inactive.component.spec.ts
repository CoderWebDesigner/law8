import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MattersInactiveComponent } from './matters-inactive.component';

describe('MattersInactiveComponent', () => {
  let component: MattersInactiveComponent;
  let fixture: ComponentFixture<MattersInactiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MattersInactiveComponent]
    });
    fixture = TestBed.createComponent(MattersInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
