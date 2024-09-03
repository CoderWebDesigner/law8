import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRelatedMatterComponent } from './client-related-matter.component';

describe('ClientRelatedMatterComponent', () => {
  let component: ClientRelatedMatterComponent;
  let fixture: ComponentFixture<ClientRelatedMatterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientRelatedMatterComponent]
    });
    fixture = TestBed.createComponent(ClientRelatedMatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
