import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterEditorGeneralComponent } from './matter-editor-general.component';

describe('MatterEditorGeneralComponent', () => {
  let component: MatterEditorGeneralComponent;
  let fixture: ComponentFixture<MatterEditorGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterEditorGeneralComponent]
    });
    fixture = TestBed.createComponent(MatterEditorGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
