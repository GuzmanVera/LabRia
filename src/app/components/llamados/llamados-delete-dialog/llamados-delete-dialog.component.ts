import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Llamados } from 'src/app/models/llamados';

@Component({
  selector: 'app-llamados-delete-dialog',
  templateUrl: './llamados-delete-dialog.component.html',
  styleUrls: ['./llamados-delete-dialog.component.scss']
})
export class LlamadosDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LlamadosDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Llamados) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
