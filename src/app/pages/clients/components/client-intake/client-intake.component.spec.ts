import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientIntakeComponent } from './client-intake.component';

describe('ClientIntakeComponent', () => {
  let component: ClientIntakeComponent;
  let fixture: ComponentFixture<ClientIntakeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientIntakeComponent]
    });
    fixture = TestBed.createComponent(ClientIntakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
