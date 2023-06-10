import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuarios } from 'src/app/models/usuarios';

@Component({
  selector: 'app-usuarios-dialog',
  templateUrl: './usuarios-dialog.component.html',
  styleUrls: ['./usuarios-dialog.component.scss']
})
export class UsuariosDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UsuariosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuarios
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
