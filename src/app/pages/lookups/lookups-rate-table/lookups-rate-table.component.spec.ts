import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupsRateTableComponent } from './lookups-rate-table.component';

describe('LookupsRateTableComponent', () => {
  let component: LookupsRateTableComponent;
  let fixture: ComponentFixture<LookupsRateTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LookupsRateTableComponent]
    });
    fixture = TestBed.createComponent(LookupsRateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
