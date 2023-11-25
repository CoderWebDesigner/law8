import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedNoDataComponent } from './shared-no-data.component';

describe('SharedNoDataComponent', () => {
  let component: SharedNoDataComponent;
  let fixture: ComponentFixture<SharedNoDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedNoDataComponent]
    });
    fixture = TestBed.createComponent(SharedNoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
