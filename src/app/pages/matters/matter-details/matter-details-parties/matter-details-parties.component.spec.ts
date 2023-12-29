import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterDetailsPartiesComponent } from './matter-details-parties.component';

describe('MatterDetailsPartiesComponent', () => {
  let component: MatterDetailsPartiesComponent;
  let fixture: ComponentFixture<MatterDetailsPartiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterDetailsPartiesComponent]
    });
    fixture = TestBed.createComponent(MatterDetailsPartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
