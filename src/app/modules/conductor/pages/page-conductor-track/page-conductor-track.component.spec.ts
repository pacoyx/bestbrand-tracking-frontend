import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageConductorTrackComponent } from './page-conductor-track.component';

describe('PageConductorTrackComponent', () => {
  let component: PageConductorTrackComponent;
  let fixture: ComponentFixture<PageConductorTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageConductorTrackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageConductorTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
