import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterDetailsContactsComponent } from './matter-details-contacts.component';

describe('MatterDetailsContactsComponent', () => {
  let component: MatterDetailsContactsComponent;
  let fixture: ComponentFixture<MatterDetailsContactsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterDetailsContactsComponent]
    });
    fixture = TestBed.createComponent(MatterDetailsContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
