import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfiyStepTwoComponent } from './verfiy-step-two.component';

describe('VerfiyStepTwoComponent', () => {
  let component: VerfiyStepTwoComponent;
  let fixture: ComponentFixture<VerfiyStepTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerfiyStepTwoComponent]
    });
    fixture = TestBed.createComponent(VerfiyStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
