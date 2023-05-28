import { TestBed } from '@angular/core/testing';

import { TiposDeDocumentoService } from './tipos-de-documento.service';

describe('TiposDeDocumentoService', () => {
  let service: TiposDeDocumentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposDeDocumentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
