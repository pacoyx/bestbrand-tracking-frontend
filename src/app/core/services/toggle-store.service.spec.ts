import { TestBed } from '@angular/core/testing';

import { ToggleStoreService } from './toggle-store.service';

describe('ToggleStoreService', () => {
  let service: ToggleStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
