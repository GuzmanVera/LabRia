import { TestBed } from '@angular/core/testing';

import { TiposDeIntegranteService } from './tipos-de-integrante.service';

describe('TiposDeIntegranteService', () => {
  let service: TiposDeIntegranteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposDeIntegranteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
