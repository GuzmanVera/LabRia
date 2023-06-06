import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamadosEstadosPosiblesDialogComponent } from './llamados-estados-posibles-dialog.component';

describe('LlamadosEstadosPosiblesDialogComponent', () => {
  let component: LlamadosEstadosPosiblesDialogComponent;
  let fixture: ComponentFixture<LlamadosEstadosPosiblesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LlamadosEstadosPosiblesDialogComponent]
    });
    fixture = TestBed.createComponent(LlamadosEstadosPosiblesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
