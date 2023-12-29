import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterDetailsDocumentsEditorComponent } from './matter-details-documents-editor.component';

describe('MatterDetailsDocumentsEditorComponent', () => {
  let component: MatterDetailsDocumentsEditorComponent;
  let fixture: ComponentFixture<MatterDetailsDocumentsEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterDetailsDocumentsEditorComponent]
    });
    fixture = TestBed.createComponent(MatterDetailsDocumentsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
