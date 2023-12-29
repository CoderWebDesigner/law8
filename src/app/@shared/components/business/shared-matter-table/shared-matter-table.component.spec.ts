import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedMatterTableComponent } from './shared-matter-table.component';

describe('SharedMatterTableComponent', () => {
  let component: SharedMatterTableComponent;
  let fixture: ComponentFixture<SharedMatterTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedMatterTableComponent]
    });
    fixture = TestBed.createComponent(SharedMatterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
