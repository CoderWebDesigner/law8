import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterReportEditorComponent } from './matter-report-editor.component';

describe('MatterReportEditorComponent', () => {
  let component: MatterReportEditorComponent;
  let fixture: ComponentFixture<MatterReportEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatterReportEditorComponent]
    });
    fixture = TestBed.createComponent(MatterReportEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
