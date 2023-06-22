import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { RolesService } from 'src/app/services/roles/roles.service';
import { Usuarios } from 'src/app/models/usuarios';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-usuarios-role-dialog',
  templateUrl: './usuarios-role-dialog.component.html',
  styleUrls: ['./usuarios-role-dialog.component.scss']
})
export class UsuariosRoleDialogComponent implements OnInit {
  roles: any[] = [];
  userRoles: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<UsuariosRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuarios,
    private usuariosService: UsuariosService,
    private rolesService: RolesService
  ) {}

  ngOnInit() {
    this.rolesService.getAll().pipe(
      catchError(error => {
        console.error(error);
        return of([]);
      })
    ).subscribe(allRoles => {
      this.usuariosService.getUserRoles(this.data.username).pipe(
        catchError(error => {
          console.error(error);
          return of({list: [{roles: []}]});
        })
      ).subscribe(userRolesRes => {
        this.userRoles = userRolesRes.list[0].roles;
        this.roles = allRoles.map((role: string) => ({
          id: role,
          name: role,
          selected: this.userRoles.includes(role)
        }));
      });
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  async apply(): Promise<void> {
    const selectedRoles = this.roles.filter(role => role.selected);
    const addedRoles = selectedRoles.filter(role => !this.userRoles.some(userRole => userRole === role.id));
    const removedRoles = this.userRoles.filter(userRole => !selectedRoles.some(role => role.id === userRole));
  
    console.log(addedRoles);
    console.log(removedRoles);
  
    try {
      for (const role of addedRoles) {
        await this.usuariosService.addUserRole({userId: this.data.id, roleId: role.name}).toPromise();
      }
  
      for (const role of removedRoles) {
        await this.usuariosService.removeUserRole(this.data.id.toString(), role.toString()).toPromise();
      }
  
      this.dialogRef.close();
    } catch (error) {
      console.error(error);
    }
  }
}