import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterAddressEditorComponent } from './matter-address-editor.component';

describe('MatterAddressEditorComponent', () => {
  let component: MatterAddressEditorComponent;
  let fixture: ComponentFixture<MatterAddressEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterAddressEditorComponent]
    });
    fixture = TestBed.createComponent(MatterAddressEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
