import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupsSubItemEditorComponent } from './lookups-sub-item-editor.component';

describe('LookupsSubItemEditorComponent', () => {
  let component: LookupsSubItemEditorComponent;
  let fixture: ComponentFixture<LookupsSubItemEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LookupsSubItemEditorComponent]
    });
    fixture = TestBed.createComponent(LookupsSubItemEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
