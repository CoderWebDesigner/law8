import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterClassComponent } from './matter-class.component';

describe('MatterClassComponent', () => {
  let component: MatterClassComponent;
  let fixture: ComponentFixture<MatterClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterClassComponent]
    });
    fixture = TestBed.createComponent(MatterClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
