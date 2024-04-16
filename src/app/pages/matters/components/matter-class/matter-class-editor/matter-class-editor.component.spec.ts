import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterClassEditorComponent } from './matter-class-editor.component';

describe('MatterClassEditorComponent', () => {
  let component: MatterClassEditorComponent;
  let fixture: ComponentFixture<MatterClassEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatterClassEditorComponent]
    });
    fixture = TestBed.createComponent(MatterClassEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
