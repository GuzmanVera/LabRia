import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Areas } from '../../../models/areas';


@Component({
  selector: 'app-areas-dialog',
  templateUrl: './areas-dialog.component.html',
  styleUrls: ['./areas-dialog.component.scss']
})
export class AreasDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AreasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Areas
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
