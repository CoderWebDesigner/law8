import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterDetailsPartiesEditorComponent } from './matter-details-parties-editor.component';

describe('MatterDetailsPartiesEditorComponent', () => {
  let component: MatterDetailsPartiesEditorComponent;
  let fixture: ComponentFixture<MatterDetailsPartiesEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterDetailsPartiesEditorComponent]
    });
    fixture = TestBed.createComponent(MatterDetailsPartiesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
