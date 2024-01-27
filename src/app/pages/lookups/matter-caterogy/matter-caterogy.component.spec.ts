import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterCaterogyComponent } from './matter-caterogy.component';

describe('MatterCaterogyComponent', () => {
  let component: MatterCaterogyComponent;
  let fixture: ComponentFixture<MatterCaterogyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatterCaterogyComponent]
    });
    fixture = TestBed.createComponent(MatterCaterogyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
