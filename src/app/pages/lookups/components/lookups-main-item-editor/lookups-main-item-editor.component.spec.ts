import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupsMainItemEditorComponent } from './lookups-main-item-editor.component';

describe('LookupsMainItemEditorComponent', () => {
  let component: LookupsMainItemEditorComponent;
  let fixture: ComponentFixture<LookupsMainItemEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LookupsMainItemEditorComponent]
    });
    fixture = TestBed.createComponent(LookupsMainItemEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
