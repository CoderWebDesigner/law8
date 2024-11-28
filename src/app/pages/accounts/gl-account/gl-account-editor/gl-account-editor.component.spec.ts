import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlAccountEditorComponent } from './gl-account-editor.component';

describe('GlAccountEditorComponent', () => {
  let component: GlAccountEditorComponent;
  let fixture: ComponentFixture<GlAccountEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlAccountEditorComponent]
    });
    fixture = TestBed.createComponent(GlAccountEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
