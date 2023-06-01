import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamadosEstadosPosiblesDeleteDialogComponent } from './llamados-estados-posibles-delete-dialog.component';

describe('LlamadosEstadosPosiblesDeleteDialogComponent', () => {
  let component: LlamadosEstadosPosiblesDeleteDialogComponent;
  let fixture: ComponentFixture<LlamadosEstadosPosiblesDeleteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LlamadosEstadosPosiblesDeleteDialogComponent]
    });
    fixture = TestBed.createComponent(LlamadosEstadosPosiblesDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
