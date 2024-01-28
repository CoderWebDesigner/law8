import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupsMatterCaterogyComponent } from './lookups-matter-caterogy.component';

describe('LookupsMatterCaterogyComponent', () => {
  let component: LookupsMatterCaterogyComponent;
  let fixture: ComponentFixture<LookupsMatterCaterogyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LookupsMatterCaterogyComponent]
    });
    fixture = TestBed.createComponent(LookupsMatterCaterogyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
