import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupsSubMatterCategoryComponent } from './lookups-sub-matter-category.component';

describe('LookupsSubMatterCategoryComponent', () => {
  let component: LookupsSubMatterCategoryComponent;
  let fixture: ComponentFixture<LookupsSubMatterCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LookupsSubMatterCategoryComponent]
    });
    fixture = TestBed.createComponent(LookupsSubMatterCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
