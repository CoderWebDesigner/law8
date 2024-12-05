import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentExpiryTrackerComponent } from './document-expiry-tracker.component';

describe('DocumentExpiryTrackerComponent', () => {
  let component: DocumentExpiryTrackerComponent;
  let fixture: ComponentFixture<DocumentExpiryTrackerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DocumentExpiryTrackerComponent]
    });
    fixture = TestBed.createComponent(DocumentExpiryTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
