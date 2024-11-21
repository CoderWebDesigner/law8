import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountEditorComponent } from './bank-account-editor.component';

describe('BankAccountEditorComponent', () => {
  let component: BankAccountEditorComponent;
  let fixture: ComponentFixture<BankAccountEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankAccountEditorComponent]
    });
    fixture = TestBed.createComponent(BankAccountEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
