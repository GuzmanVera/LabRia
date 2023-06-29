import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Responsabilidades } from 'src/app/models/responsabilidades';

@Component({
  selector: 'app-responsabilidades-delete-dialog',
  templateUrl: './responsabilidades-delete-dialog.component.html',
  styleUrls: ['./responsabilidades-delete-dialog.component.scss']
})
export class ResponsabilidadesDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ResponsabilidadesDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Responsabilidades) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}