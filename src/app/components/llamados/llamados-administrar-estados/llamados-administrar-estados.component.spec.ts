import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamadosAdministrarEstadosComponent } from './llamados-administrar-estados.component';

describe('LlamadosAdministrarEstadosComponent', () => {
  let component: LlamadosAdministrarEstadosComponent;
  let fixture: ComponentFixture<LlamadosAdministrarEstadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LlamadosAdministrarEstadosComponent]
    });
    fixture = TestBed.createComponent(LlamadosAdministrarEstadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
