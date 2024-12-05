import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductivityReportEditorComponent } from './productivity-report-editor.component';

describe('ProductivityReportEditorComponent', () => {
  let component: ProductivityReportEditorComponent;
  let fixture: ComponentFixture<ProductivityReportEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductivityReportEditorComponent]
    });
    fixture = TestBed.createComponent(ProductivityReportEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
