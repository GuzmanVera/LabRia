import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamadosModificarEstadosComponent } from './llamados-modificar-estados.component';

describe('LlamadosModificarEstadosComponent', () => {
  let component: LlamadosModificarEstadosComponent;
  let fixture: ComponentFixture<LlamadosModificarEstadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LlamadosModificarEstadosComponent]
    });
    fixture = TestBed.createComponent(LlamadosModificarEstadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
