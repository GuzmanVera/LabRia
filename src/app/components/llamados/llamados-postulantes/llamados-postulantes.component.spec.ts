import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamadosPostulantesComponent } from './llamados-postulantes.component';

describe('LlamadosPostulantesComponent', () => {
  let component: LlamadosPostulantesComponent;
  let fixture: ComponentFixture<LlamadosPostulantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LlamadosPostulantesComponent]
    });
    fixture = TestBed.createComponent(LlamadosPostulantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
