import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterDetailsActivityComponent } from './matter-details-activity.component';

describe('MatterDetailsActivityComponent', () => {
  let component: MatterDetailsActivityComponent;
  let fixture: ComponentFixture<MatterDetailsActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterDetailsActivityComponent]
    });
    fixture = TestBed.createComponent(MatterDetailsActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
