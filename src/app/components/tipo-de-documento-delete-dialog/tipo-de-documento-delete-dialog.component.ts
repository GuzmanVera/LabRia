import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoDeDocumento } from '../../models/tipo-de-documento';

@Component({
  selector: 'app-delete-tipo-de-documento-dialog',
  templateUrl: './tipo-de-documento-delete-dialog.component.html',
})
export class TipoDeDocumentoDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TipoDeDocumentoDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TipoDeDocumento) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
