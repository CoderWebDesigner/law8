import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditorDefaultRateEditorComponent } from './user-editor-default-rate-editor.component';

describe('UserEditorDefaultRateEditorComponent', () => {
  let component: UserEditorDefaultRateEditorComponent;
  let fixture: ComponentFixture<UserEditorDefaultRateEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEditorDefaultRateEditorComponent]
    });
    fixture = TestBed.createComponent(UserEditorDefaultRateEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
