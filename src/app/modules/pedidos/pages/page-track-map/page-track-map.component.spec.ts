import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTrackMapComponent } from './page-track-map.component';

describe('PageTrackMapComponent', () => {
  let component: PageTrackMapComponent;
  let fixture: ComponentFixture<PageTrackMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTrackMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTrackMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
