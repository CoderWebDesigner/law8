import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityGroupsEditorComponent } from './security-groups-editor.component';

describe('SecurityGroupsEditorComponent', () => {
  let component: SecurityGroupsEditorComponent;
  let fixture: ComponentFixture<SecurityGroupsEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityGroupsEditorComponent]
    });
    fixture = TestBed.createComponent(SecurityGroupsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
