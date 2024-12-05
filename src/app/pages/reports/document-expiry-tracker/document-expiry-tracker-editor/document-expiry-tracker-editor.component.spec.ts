import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentExpiryTrackerEditorComponent } from './document-expiry-tracker-editor.component';

describe('DocumentExpiryTrackerEditorComponent', () => {
  let component: DocumentExpiryTrackerEditorComponent;
  let fixture: ComponentFixture<DocumentExpiryTrackerEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DocumentExpiryTrackerEditorComponent]
    });
    fixture = TestBed.createComponent(DocumentExpiryTrackerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
