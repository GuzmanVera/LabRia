import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoDeDocumento } from '../../models/tipo-de-documento';

@Component({
  selector: 'app-tipo-de-documento-dialog',
  templateUrl: './tipo-de-documento-dialog.component.html',
  styleUrls: ['./tipo-de-documento-dialog.component.scss']
})
export class TipoDeDocumentoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TipoDeDocumentoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TipoDeDocumento
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

