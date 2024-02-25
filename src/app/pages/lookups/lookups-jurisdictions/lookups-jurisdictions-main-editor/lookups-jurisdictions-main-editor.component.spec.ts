import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupsJurisdictionsMainEditorComponent } from './lookups-jurisdictions-main-editor.component';

describe('LookupsJurisdictionsMainEditorComponent', () => {
  let component: LookupsJurisdictionsMainEditorComponent;
  let fixture: ComponentFixture<LookupsJurisdictionsMainEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LookupsJurisdictionsMainEditorComponent]
    });
    fixture = TestBed.createComponent(LookupsJurisdictionsMainEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
