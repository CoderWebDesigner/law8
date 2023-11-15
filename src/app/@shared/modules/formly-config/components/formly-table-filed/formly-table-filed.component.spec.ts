import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyTableFiledComponent } from './formly-table-filed.component';

describe('FormlyTableFiledComponent', () => {
  let component: FormlyTableFiledComponent;
  let fixture: ComponentFixture<FormlyTableFiledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyTableFiledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyTableFiledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
