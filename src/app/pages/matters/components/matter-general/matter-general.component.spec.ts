import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterGeneralComponent } from './matter-general.component';

describe('MatterGeneralComponent', () => {
  let component: MatterGeneralComponent;
  let fixture: ComponentFixture<MatterGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterGeneralComponent]
    });
    fixture = TestBed.createComponent(MatterGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
