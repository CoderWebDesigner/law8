import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterContactComponent } from './matter-contact.component';

describe('MatterContactComponent', () => {
  let component: MatterContactComponent;
  let fixture: ComponentFixture<MatterContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterContactComponent]
    });
    fixture = TestBed.createComponent(MatterContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
