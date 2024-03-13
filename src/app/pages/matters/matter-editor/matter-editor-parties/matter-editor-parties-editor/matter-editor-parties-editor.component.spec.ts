import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterEditorPartiesEditorComponent } from './matter-editor-parties-editor.component';

describe('MatterEditorPartiesEditorComponent', () => {
  let component: MatterEditorPartiesEditorComponent;
  let fixture: ComponentFixture<MatterEditorPartiesEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterEditorPartiesEditorComponent]
    });
    fixture = TestBed.createComponent(MatterEditorPartiesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
