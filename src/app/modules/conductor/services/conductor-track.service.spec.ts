import { TestBed } from '@angular/core/testing';

import { ConductorTrackService } from './conductor-track.service';

describe('ConductorTrackService', () => {
  let service: ConductorTrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConductorTrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
