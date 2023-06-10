import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuarios } from 'src/app/models/usuarios';

@Component({
  selector: 'app-usuarios-delete-dialog',
  templateUrl: './usuarios-delete-dialog.component.html',
  styleUrls: ['./usuarios-delete-dialog.component.scss']
})
export class UsuariosDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UsuariosDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuarios) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
