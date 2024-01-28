import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupsMainListComponent } from './lookups-main-list.component';

describe('LookupsMainListComponent', () => {
  let component: LookupsMainListComponent;
  let fixture: ComponentFixture<LookupsMainListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LookupsMainListComponent]
    });
    fixture = TestBed.createComponent(LookupsMainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
