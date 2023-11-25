import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailsDocumentsComponent } from './client-details-documents.component';

describe('ClientDetailsDocumentsComponent', () => {
  let component: ClientDetailsDocumentsComponent;
  let fixture: ComponentFixture<ClientDetailsDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientDetailsDocumentsComponent]
    });
    fixture = TestBed.createComponent(ClientDetailsDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
