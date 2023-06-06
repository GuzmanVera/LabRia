import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeDocumentoDeleteDialogComponent } from './tipo-de-documento-delete-dialog.component';

describe('TipoDeDocumentoDeleteDialogComponent', () => {
  let component: TipoDeDocumentoDeleteDialogComponent;
  let fixture: ComponentFixture<TipoDeDocumentoDeleteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoDeDocumentoDeleteDialogComponent]
    });
    fixture = TestBed.createComponent(TipoDeDocumentoDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
