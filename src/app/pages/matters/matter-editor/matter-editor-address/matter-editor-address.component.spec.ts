import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterEditorAddressComponent } from './matter-editor-address.component';

describe('MatterEditorAddressComponent', () => {
  let component: MatterEditorAddressComponent;
  let fixture: ComponentFixture<MatterEditorAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterEditorAddressComponent]
    });
    fixture = TestBed.createComponent(MatterEditorAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
