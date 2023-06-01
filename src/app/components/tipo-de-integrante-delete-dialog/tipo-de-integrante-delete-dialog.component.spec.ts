import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeIntegranteDeleteDialogComponent } from './tipo-de-integrante-delete-dialog.component';

describe('TipoDeIntegranteDeleteDialogComponent', () => {
  let component: TipoDeIntegranteDeleteDialogComponent;
  let fixture: ComponentFixture<TipoDeIntegranteDeleteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoDeIntegranteDeleteDialogComponent]
    });
    fixture = TestBed.createComponent(TipoDeIntegranteDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
