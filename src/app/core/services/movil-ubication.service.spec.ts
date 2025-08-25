import { TestBed } from '@angular/core/testing';

import { MovilUbicationService } from './movil-ubication.service';

describe('MovilUbicationService', () => {
  let service: MovilUbicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovilUbicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
