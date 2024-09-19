import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterReportComponent } from './matter-report.component';

describe('MatterReportComponent', () => {
  let component: MatterReportComponent;
  let fixture: ComponentFixture<MatterReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatterReportComponent]
    });
    fixture = TestBed.createComponent(MatterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
