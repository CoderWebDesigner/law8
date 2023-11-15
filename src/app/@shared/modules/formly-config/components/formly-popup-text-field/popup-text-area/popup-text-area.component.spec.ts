import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTextAreaComponent } from './popup-text-area.component';

describe('PopupTextAreaComponent', () => {
  let component: PopupTextAreaComponent;
  let fixture: ComponentFixture<PopupTextAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupTextAreaComponent]
    });
    fixture = TestBed.createComponent(PopupTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
