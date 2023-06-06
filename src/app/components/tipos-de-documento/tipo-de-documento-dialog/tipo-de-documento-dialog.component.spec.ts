import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeDocumentoDialogComponent } from './tipo-de-documento-dialog.component';

describe('TipoDeDocumentoDialogComponent', () => {
  let component: TipoDeDocumentoDialogComponent;
  let fixture: ComponentFixture<TipoDeDocumentoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoDeDocumentoDialogComponent]
    });
    fixture = TestBed.createComponent(TipoDeDocumentoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
