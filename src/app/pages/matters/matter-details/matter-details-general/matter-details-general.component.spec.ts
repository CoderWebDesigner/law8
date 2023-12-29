import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterDetailsGeneralComponent } from './matter-details-general.component';

describe('MatterDetailsGeneralComponent', () => {
  let component: MatterDetailsGeneralComponent;
  let fixture: ComponentFixture<MatterDetailsGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterDetailsGeneralComponent]
    });
    fixture = TestBed.createComponent(MatterDetailsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
