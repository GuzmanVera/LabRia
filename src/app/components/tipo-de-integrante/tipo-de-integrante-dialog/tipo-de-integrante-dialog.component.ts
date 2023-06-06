import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoDeIntegrante } from 'src/app/models/tipo-de-integrante';

@Component({
  selector: 'app-tipo-de-integrante-dialog',
  templateUrl: './tipo-de-integrante-dialog.component.html',
  styleUrls: ['./tipo-de-integrante-dialog.component.scss']
})
export class TipoDeIntegranteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TipoDeIntegranteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TipoDeIntegrante
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
