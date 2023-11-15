import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTabsComponent } from '@shared/components/fatora-tabs/shared-tabs.component';

describe('SharedTabsComponent', () => {
  let component: SharedTabsComponent;
  let fixture: ComponentFixture<SharedTabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedTabsComponent]
    });
    fixture = TestBed.createComponent(SharedTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
