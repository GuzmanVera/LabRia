import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Areas } from 'src/app/models/areas';

@Component({
  selector: 'app-areas-delete-dialog',
  templateUrl: './areas-delete-dialog.component.html',
  styleUrls: ['./areas-delete-dialog.component.scss']
})
export class AreasDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AreasDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Areas) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
