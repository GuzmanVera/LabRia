import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LlamadosEstadosPosibles } from 'src/app/models/llamados-estados-posibles';

@Component({
  selector: 'app-llamados-estados-posibles-delete-dialog',
  templateUrl: './llamados-estados-posibles-delete-dialog.component.html',
  styleUrls: ['./llamados-estados-posibles-delete-dialog.component.scss']
})
export class LlamadosEstadosPosiblesDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LlamadosEstadosPosiblesDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LlamadosEstadosPosibles) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
