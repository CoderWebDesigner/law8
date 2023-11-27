import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailsRelatedMattersComponent } from './client-details-related-matters.component';

describe('ClientDetailsRelatedMattersComponent', () => {
  let component: ClientDetailsRelatedMattersComponent;
  let fixture: ComponentFixture<ClientDetailsRelatedMattersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientDetailsRelatedMattersComponent]
    });
    fixture = TestBed.createComponent(ClientDetailsRelatedMattersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
