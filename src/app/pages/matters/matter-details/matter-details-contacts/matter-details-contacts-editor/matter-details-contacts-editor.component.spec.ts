import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterDetailsContactsEditorComponent } from './matter-details-contacts-editor.component';

describe('MatterDetailsContactsEditorComponent', () => {
  let component: MatterDetailsContactsEditorComponent;
  let fixture: ComponentFixture<MatterDetailsContactsEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterDetailsContactsEditorComponent]
    });
    fixture = TestBed.createComponent(MatterDetailsContactsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
