import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupsMatterRegionsComponent } from './lookups-matter-regions.component';

describe('LookupsMatterRegionsComponent', () => {
  let component: LookupsMatterRegionsComponent;
  let fixture: ComponentFixture<LookupsMatterRegionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LookupsMatterRegionsComponent]
    });
    fixture = TestBed.createComponent(LookupsMatterRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
