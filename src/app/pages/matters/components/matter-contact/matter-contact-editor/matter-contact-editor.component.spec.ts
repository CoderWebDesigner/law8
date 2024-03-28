import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterContactEditorComponent } from './matter-contact-editor.component';

describe('MatterContactEditorComponent', () => {
  let component: MatterContactEditorComponent;
  let fixture: ComponentFixture<MatterContactEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatterContactEditorComponent]
    });
    fixture = TestBed.createComponent(MatterContactEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
