import { TestBed } from '@angular/core/testing';

import { LlamadosEstadosPosiblesService } from './llamados-estados-posibles.service';

describe('LlamadosEstadosPosiblesService', () => {
  let service: LlamadosEstadosPosiblesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LlamadosEstadosPosiblesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
