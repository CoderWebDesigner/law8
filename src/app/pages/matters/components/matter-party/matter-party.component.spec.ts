import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterPartyComponent } from './matter-party.component';

describe('MatterPartyComponent', () => {
  let component: MatterPartyComponent;
  let fixture: ComponentFixture<MatterPartyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterPartyComponent]
    });
    fixture = TestBed.createComponent(MatterPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
