import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterAddressComponent } from './matter-address.component';

describe('MatterAddressComponent', () => {
  let component: MatterAddressComponent;
  let fixture: ComponentFixture<MatterAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatterAddressComponent]
    });
    fixture = TestBed.createComponent(MatterAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
