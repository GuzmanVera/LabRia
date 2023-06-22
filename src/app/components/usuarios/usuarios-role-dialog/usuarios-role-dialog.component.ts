import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuarios } from 'src/app/models/usuarios';

@Component({
  selector: 'app-usuarios-role-dialog',
  templateUrl: './usuarios-role-dialog.component.html',
  styleUrls: ['./usuarios-role-dialog.component.scss']
})
export class UsuariosRoleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UsuariosRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuarios) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
