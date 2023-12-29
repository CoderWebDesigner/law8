import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterDetailsMainInfoComponent } from './matter-details-main-info.component';

describe('MatterDetailsMainInfoComponent', () => {
  let component: MatterDetailsMainInfoComponent;
  let fixture: ComponentFixture<MatterDetailsMainInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterDetailsMainInfoComponent]
    });
    fixture = TestBed.createComponent(MatterDetailsMainInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
