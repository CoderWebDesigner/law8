import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedAddressEditorComponent } from './shared-address-editor.component';

describe('SharedAddressEditorComponent', () => {
  let component: SharedAddressEditorComponent;
  let fixture: ComponentFixture<SharedAddressEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedAddressEditorComponent]
    });
    fixture = TestBed.createComponent(SharedAddressEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
