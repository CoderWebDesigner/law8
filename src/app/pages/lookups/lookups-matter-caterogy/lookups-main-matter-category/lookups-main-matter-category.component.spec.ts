import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupsMainMatterCategoryComponent } from './lookups-main-matter-category.component';

describe('LookupsMainMatterCategoryComponent', () => {
  let component: LookupsMainMatterCategoryComponent;
  let fixture: ComponentFixture<LookupsMainMatterCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LookupsMainMatterCategoryComponent]
    });
    fixture = TestBed.createComponent(LookupsMainMatterCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
