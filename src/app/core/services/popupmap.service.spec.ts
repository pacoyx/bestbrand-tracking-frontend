import { TestBed } from '@angular/core/testing';

import { PopupmapService } from './popupmap.service';

describe('PopupmapService', () => {
  let service: PopupmapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupmapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
