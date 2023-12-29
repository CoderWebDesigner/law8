import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterDetailsAddressComponent } from './matter-details-address.component';

describe('MatterDetailsAddressComponent', () => {
  let component: MatterDetailsAddressComponent;
  let fixture: ComponentFixture<MatterDetailsAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterDetailsAddressComponent]
    });
    fixture = TestBed.createComponent(MatterDetailsAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
