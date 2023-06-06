import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeIntegranteDialogComponent } from './tipo-de-integrante-dialog.component';

describe('TipoDeIntegranteDialogComponent', () => {
  let component: TipoDeIntegranteDialogComponent;
  let fixture: ComponentFixture<TipoDeIntegranteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoDeIntegranteDialogComponent]
    });
    fixture = TestBed.createComponent(TipoDeIntegranteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
