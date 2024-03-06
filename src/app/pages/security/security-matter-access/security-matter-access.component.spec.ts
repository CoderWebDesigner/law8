import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityMatterAccessComponent } from './security-matter-access.component';

describe('SecurityMatterAccessComponent', () => {
  let component: SecurityMatterAccessComponent;
  let fixture: ComponentFixture<SecurityMatterAccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SecurityMatterAccessComponent]
    });
    fixture = TestBed.createComponent(SecurityMatterAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
