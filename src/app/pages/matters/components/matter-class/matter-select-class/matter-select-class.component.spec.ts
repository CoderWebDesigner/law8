import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterSelectClassComponent } from './matter-select-class.component';

describe('MatterSelectClassComponent', () => {
  let component: MatterSelectClassComponent;
  let fixture: ComponentFixture<MatterSelectClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterSelectClassComponent]
    });
    fixture = TestBed.createComponent(MatterSelectClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
