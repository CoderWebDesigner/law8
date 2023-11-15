import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedSearchInputComponent } from '@shared/components/fatora-search-input/shared-search-input.component';

describe('SharedSearchInputComponent', () => {
  let component: SharedSearchInputComponent;
  let fixture: ComponentFixture<SharedSearchInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedSearchInputComponent]
    });
    fixture = TestBed.createComponent(SharedSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
