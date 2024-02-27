import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupsSubRateComponent } from './lookups-sub-rate.component';

describe('LookupsSubRateComponent', () => {
  let component: LookupsSubRateComponent;
  let fixture: ComponentFixture<LookupsSubRateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LookupsSubRateComponent]
    });
    fixture = TestBed.createComponent(LookupsSubRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
