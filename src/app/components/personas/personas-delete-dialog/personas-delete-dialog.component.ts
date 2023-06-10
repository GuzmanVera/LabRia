import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Personas } from 'src/app/models/personas';

@Component({
  selector: 'app-personas-delete-dialog',
  templateUrl: './personas-delete-dialog.component.html',
  styleUrls: ['./personas-delete-dialog.component.scss']
})
export class PersonasDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PersonasDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Personas) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
