import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityMatterAccessResponsableLawyersComponent } from './security-matter-access-responsable-lawyers.component';

describe('SecurityMatterAccessResponsableLawyersComponent', () => {
  let component: SecurityMatterAccessResponsableLawyersComponent;
  let fixture: ComponentFixture<SecurityMatterAccessResponsableLawyersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityMatterAccessResponsableLawyersComponent]
    });
    fixture = TestBed.createComponent(SecurityMatterAccessResponsableLawyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
