import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterEditorPartiesComponent } from './matter-editor-parties.component';

describe('MatterEditorPartiesComponent', () => {
  let component: MatterEditorPartiesComponent;
  let fixture: ComponentFixture<MatterEditorPartiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterEditorPartiesComponent]
    });
    fixture = TestBed.createComponent(MatterEditorPartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
