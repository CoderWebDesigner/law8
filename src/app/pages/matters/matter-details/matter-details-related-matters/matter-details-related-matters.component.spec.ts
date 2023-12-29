import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterDetailsRelatedMattersComponent } from './matter-details-related-matters.component';

describe('MatterDetailsRelatedMattersComponent', () => {
  let component: MatterDetailsRelatedMattersComponent;
  let fixture: ComponentFixture<MatterDetailsRelatedMattersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterDetailsRelatedMattersComponent]
    });
    fixture = TestBed.createComponent(MatterDetailsRelatedMattersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
