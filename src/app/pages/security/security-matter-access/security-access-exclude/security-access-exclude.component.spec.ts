import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityAccessExcludeComponent } from './security-access-exclude.component';

describe('SecurityAccessExcludeComponent', () => {
  let component: SecurityAccessExcludeComponent;
  let fixture: ComponentFixture<SecurityAccessExcludeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SecurityAccessExcludeComponent]
    });
    fixture = TestBed.createComponent(SecurityAccessExcludeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
