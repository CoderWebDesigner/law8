import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreBillComponent } from './pre-bill.component';

describe('PreBillComponent', () => {
  let component: PreBillComponent;
  let fixture: ComponentFixture<PreBillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreBillComponent]
    });
    fixture = TestBed.createComponent(PreBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
