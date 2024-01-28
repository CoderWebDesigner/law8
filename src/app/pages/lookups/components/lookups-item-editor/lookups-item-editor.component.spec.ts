import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupsItemEditorComponent } from './lookups-item-editor.component';

describe('LookupsItemEditorComponent', () => {
  let component: LookupsItemEditorComponent;
  let fixture: ComponentFixture<LookupsItemEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LookupsItemEditorComponent]
    });
    fixture = TestBed.createComponent(LookupsItemEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
