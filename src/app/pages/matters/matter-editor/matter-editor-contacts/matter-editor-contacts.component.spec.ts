import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterEditorContactsComponent } from './matter-editor-contacts.component';

describe('MatterEditorContactsComponent', () => {
  let component: MatterEditorContactsComponent;
  let fixture: ComponentFixture<MatterEditorContactsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterEditorContactsComponent]
    });
    fixture = TestBed.createComponent(MatterEditorContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
