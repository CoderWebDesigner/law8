import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreBillInfoComponent } from './pre-bill-info.component';

describe('PreBillInfoComponent', () => {
  let component: PreBillInfoComponent;
  let fixture: ComponentFixture<PreBillInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreBillInfoComponent]
    });
    fixture = TestBed.createComponent(PreBillInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
