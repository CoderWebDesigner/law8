import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterDetailsActivityEditorComponent } from './matter-details-activity-editor.component';

describe('MatterDetailsActivityEditorComponent', () => {
  let component: MatterDetailsActivityEditorComponent;
  let fixture: ComponentFixture<MatterDetailsActivityEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterDetailsActivityEditorComponent]
    });
    fixture = TestBed.createComponent(MatterDetailsActivityEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
