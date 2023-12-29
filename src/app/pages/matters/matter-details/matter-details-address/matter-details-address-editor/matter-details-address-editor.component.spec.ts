import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterDetailsAddressEditorComponent } from './matter-details-address-editor.component';

describe('MatterDetailsAddressEditorComponent', () => {
  let component: MatterDetailsAddressEditorComponent;
  let fixture: ComponentFixture<MatterDetailsAddressEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterDetailsAddressEditorComponent]
    });
    fixture = TestBed.createComponent(MatterDetailsAddressEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
