import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoDeIntegrante } from 'src/app/models/tipo-de-integrante';

@Component({
  selector: 'app-tipo-de-integrante-delete-dialog',
  templateUrl: './tipo-de-integrante-delete-dialog.component.html',
  styleUrls: ['./tipo-de-integrante-delete-dialog.component.scss']
})
export class TipoDeIntegranteDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TipoDeIntegranteDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TipoDeIntegrante) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
