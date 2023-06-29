import { TestBed } from '@angular/core/testing';

import { ResponsabilidadesService } from './responsabilidades.service';

describe('ResponsabilidadesService', () => {
  let service: ResponsabilidadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsabilidadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
