import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterEditorContractEditorComponent } from './matter-editor-contract-editor.component';

describe('MatterEditorContractEditorComponent', () => {
  let component: MatterEditorContractEditorComponent;
  let fixture: ComponentFixture<MatterEditorContractEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterEditorContractEditorComponent]
    });
    fixture = TestBed.createComponent(MatterEditorContractEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
