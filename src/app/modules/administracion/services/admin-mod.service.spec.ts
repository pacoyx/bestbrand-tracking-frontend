import { TestBed } from '@angular/core/testing';

import { AdminModService } from './admin-mod.service';

describe('AdminModService', () => {
  let service: AdminModService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminModService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
