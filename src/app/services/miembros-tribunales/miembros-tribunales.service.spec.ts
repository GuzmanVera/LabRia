import { TestBed } from '@angular/core/testing';

import { MiembrosTribunalesService } from './miembros-tribunales.service';

describe('MiembrosTribunalesService', () => {
  let service: MiembrosTribunalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiembrosTribunalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
