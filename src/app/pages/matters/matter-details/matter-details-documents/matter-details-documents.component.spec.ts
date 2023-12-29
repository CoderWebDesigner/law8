import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterDetailsDocumentsComponent } from './matter-details-documents.component';

describe('MatterDetailsDocumentsComponent', () => {
  let component: MatterDetailsDocumentsComponent;
  let fixture: ComponentFixture<MatterDetailsDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterDetailsDocumentsComponent]
    });
    fixture = TestBed.createComponent(MatterDetailsDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
