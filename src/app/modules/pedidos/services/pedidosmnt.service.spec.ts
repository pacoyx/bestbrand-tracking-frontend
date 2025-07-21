import { TestBed } from '@angular/core/testing';

import { PedidosmntService } from './pedidosmnt.service';

describe('PedidosmntService', () => {
  let service: PedidosmntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidosmntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
