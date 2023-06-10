import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Personas } from 'src/app/models/personas';

@Component({
  selector: 'app-personas-dialog',
  templateUrl: './personas-dialog.component.html',
  styleUrls: ['./personas-dialog.component.scss']
})
export class PersonasDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PersonasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Personas
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
