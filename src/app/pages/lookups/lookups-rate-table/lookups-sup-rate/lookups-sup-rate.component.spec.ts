import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupsSupRateComponent } from './lookups-sup-rate.component';

describe('LookupsSupRateComponent', () => {
  let component: LookupsSupRateComponent;
  let fixture: ComponentFixture<LookupsSupRateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LookupsSupRateComponent]
    });
    fixture = TestBed.createComponent(LookupsSupRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
