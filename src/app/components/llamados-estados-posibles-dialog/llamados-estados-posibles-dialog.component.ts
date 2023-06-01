import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LlamadosEstadosPosibles } from 'src/app/models/llamados-estados-posibles';

@Component({
  selector: 'app-llamados-estados-posibles-dialog',
  templateUrl: './llamados-estados-posibles-dialog.component.html',
  styleUrls: ['./llamados-estados-posibles-dialog.component.scss']
})
export class LlamadosEstadosPosiblesDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LlamadosEstadosPosiblesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LlamadosEstadosPosibles
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
