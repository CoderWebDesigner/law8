import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterEditorContractsComponent } from './matter-editor-contracts.component';

describe('MatterEditorContractsComponent', () => {
  let component: MatterEditorContractsComponent;
  let fixture: ComponentFixture<MatterEditorContractsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterEditorContractsComponent]
    });
    fixture = TestBed.createComponent(MatterEditorContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
