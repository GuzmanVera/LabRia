import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { UsuariosDialogComponent } from './usuarios-dialog/usuarios-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosRoleDialogComponent } from './usuarios-role-dialog/usuarios-role-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  displayedColumns: string[] = ['imagen', 'documento', 'email', 'nombre', 'activo', 'actions'];
  dataSource: Usuarios[] = [];  // inicializa el dataSource aquí
  totalCount: number = 0;
  pageEvent: PageEvent = {pageIndex: 0, pageSize: 10, length: 0};
  sortDirection: 'asc' | 'desc' = 'asc'; // Dirección de la ordenación
  sortField: string = ''; // Campo de ordenación


  selectedField: string = 'nombre';  // Campo inicial para el filtro.
  fieldsToFilter = [
    //{value: 'nombre', viewValue: 'Nombre'},
    {value: 'email', viewValue: 'Email'},
    {value: 'documento', viewValue: 'Documento'},
    //{value: 'activo', viewValue: 'Activo'}
    
  ];

  onPaginateChange(event: PageEvent) {
    this.pageEvent = event;
    
    this.getUsuarios(this.selectedField);
  }
  
  sortData(field: string) {
    // Si el campo es el mismo que el anterior, cambiamos la dirección de la ordenación
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Si es un nuevo campo, ordenamos ascendente por defecto
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  
    // Actualizamos la consulta a la API con el nuevo ordenamiento
    this.getUsuarios(this.selectedField);
  }
  

  constructor(private usuariosService: UsuariosService, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getUsuarios(this.selectedField);
  }

  filterValue!: string;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue;
    this.getUsuarios(this.selectedField);
  }



getUsuarios(field: string): void {
  const pageIndex = this.pageEvent ? this.pageEvent.pageIndex : 0;
  const pageSize = this.pageEvent ? this.pageEvent.pageSize : 10;
  const offset = pageIndex * pageSize;
  const sort = this.sortField ? `${this.sortField} ${this.sortDirection}` : '';
  this.usuariosService.getAll(offset, pageSize, this.filterValue, sort, field).subscribe(
    response => {
      this.dataSource = response.list;
      this.totalCount = response.totalCount;
    },
    error => {
      this.snackBar.open('Hubo un error al recuperar los usuarios', 'Cerrar', { duration: 5000 });
    }
  );
}
  openCreateDialog(): void {
    const dialogRef = this.dialog.open(UsuariosDialogComponent, {
      width: '500px',
      data: {
        nombre: '',
        activo: false,
      } 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // "result" contiene los datos devueltos por el diálogo. En este caso, el tipo de documento a crear.
      if (result) {
        this.usuariosService.create(result).subscribe({
          next: (data) => {
            this.dataSource.push(data);
            this.getUsuarios(this.selectedField);
            this.snackBar.open('Usuario creado con éxito', 'Cerrar', { duration: 5000 });
          },
          error: (error) => {
            this.snackBar.open('Hubo un error al crear el usuario', 'Cerrar', { duration: 5000 });
          }
        });
      }
    });
    this.getUsuarios(this.selectedField)
  }
  
  openEditDialog(usuarios: Usuarios): void {
    const dialogRef = this.dialog.open(UsuariosDialogComponent, {
      width: '500px',
      data: {...usuarios} // Hacemos una copia del objeto para no modificar el original.
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.getUsuarios(this.selectedField);
      this.snackBar.open('Usuario editado con éxito', 'Cerrar', { duration: 5000 });
    });
  }

  openRoleDialog(usuarios: Usuarios): void {
    const dialogRef = this.dialog.open(UsuariosRoleDialogComponent, {
      width: '250px',
      data: {...usuarios}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.getUsuarios(this.selectedField);
      this.snackBar.open('Roles del usuario actualizados con éxito', 'Cerrar', { duration: 5000 });
    });
  }
}
