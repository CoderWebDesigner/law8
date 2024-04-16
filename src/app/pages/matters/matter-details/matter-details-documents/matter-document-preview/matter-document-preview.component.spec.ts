import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterDocumentPreviewComponent } from './matter-document-preview.component';

describe('MatterDocumentPreviewComponent', () => {
  let component: MatterDocumentPreviewComponent;
  let fixture: ComponentFixture<MatterDocumentPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterDocumentPreviewComponent]
    });
    fixture = TestBed.createComponent(MatterDocumentPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
