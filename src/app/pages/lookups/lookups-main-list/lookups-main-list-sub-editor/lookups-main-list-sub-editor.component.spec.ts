import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupsMainListSubEditorComponent } from './lookups-main-list-sub-editor.component';

describe('LookupsMainListSubEditorComponent', () => {
  let component: LookupsMainListSubEditorComponent;
  let fixture: ComponentFixture<LookupsMainListSubEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LookupsMainListSubEditorComponent]
    });
    fixture = TestBed.createComponent(LookupsMainListSubEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
