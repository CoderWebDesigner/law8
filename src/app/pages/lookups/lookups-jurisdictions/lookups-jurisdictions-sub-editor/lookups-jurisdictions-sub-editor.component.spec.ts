import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupsJurisdictionsSubEditorComponent } from './lookups-jurisdictions-sub-editor.component';

describe('LookupsJurisdictionsSubEditorComponent', () => {
  let component: LookupsJurisdictionsSubEditorComponent;
  let fixture: ComponentFixture<LookupsJurisdictionsSubEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LookupsJurisdictionsSubEditorComponent]
    });
    fixture = TestBed.createComponent(LookupsJurisdictionsSubEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
