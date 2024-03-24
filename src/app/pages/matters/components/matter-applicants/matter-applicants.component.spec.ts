import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterApplicantsComponent } from './matter-applicants.component';

describe('MatterApplicantsComponent', () => {
  let component: MatterApplicantsComponent;
  let fixture: ComponentFixture<MatterApplicantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterApplicantsComponent]
    });
    fixture = TestBed.createComponent(MatterApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
