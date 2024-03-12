import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityMatterAccessJurisdictionComponent } from './security-matter-access-jurisdiction.component';

describe('SecurityMatterAccessJurisdictionComponent', () => {
  let component: SecurityMatterAccessJurisdictionComponent;
  let fixture: ComponentFixture<SecurityMatterAccessJurisdictionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityMatterAccessJurisdictionComponent]
    });
    fixture = TestBed.createComponent(SecurityMatterAccessJurisdictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
