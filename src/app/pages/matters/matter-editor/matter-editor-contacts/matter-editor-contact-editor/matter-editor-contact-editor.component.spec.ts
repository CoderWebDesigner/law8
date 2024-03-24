import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterEditorContactEditorComponent } from './matter-editor-contact-editor.component';

describe('MatterEditorContactEditorComponent', () => {
  let component: MatterEditorContactEditorComponent;
  let fixture: ComponentFixture<MatterEditorContactEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterEditorContactEditorComponent]
    });
    fixture = TestBed.createComponent(MatterEditorContactEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
