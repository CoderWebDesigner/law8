import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductivityReportComponent } from './productivity-report.component';

describe('ProductivityReportComponent', () => {
  let component: ProductivityReportComponent;
  let fixture: ComponentFixture<ProductivityReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductivityReportComponent]
    });
    fixture = TestBed.createComponent(ProductivityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
