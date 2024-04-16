import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterApplicantsEditorComponent } from './matter-applicants-editor.component';

describe('MatterApplicantsEditorComponent', () => {
  let component: MatterApplicantsEditorComponent;
  let fixture: ComponentFixture<MatterApplicantsEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterApplicantsEditorComponent]
    });
    fixture = TestBed.createComponent(MatterApplicantsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
