import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityMatterAccessClientsComponent } from './security-matter-access-clients.component';

describe('SecurityMatterAccessClientsComponent', () => {
  let component: SecurityMatterAccessClientsComponent;
  let fixture: ComponentFixture<SecurityMatterAccessClientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityMatterAccessClientsComponent]
    });
    fixture = TestBed.createComponent(SecurityMatterAccessClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
