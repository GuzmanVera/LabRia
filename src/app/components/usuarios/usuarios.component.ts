import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { UsuariosDialogComponent } from './usuarios-dialog/usuarios-dialog.component';
import { UsuariosDeleteDialogComponent } from './usuarios-delete-dialog/usuarios-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  displayedColumns: string[] = ['id', 'nombre', 'activo', 'actions'];
  dataSource: Usuarios[] = [];  // inicializa el dataSource aquí
  totalCount: number = 0;
  pageEvent: PageEvent = {pageIndex: 0, pageSize: 10, length: 0};
  sortDirection: 'asc' | 'desc' = 'asc'; // Dirección de la ordenación
  sortField: string = ''; // Campo de ordenación


  onPaginateChange(event: PageEvent) {
    this.pageEvent = event;
    
    this.getUsuarios();
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
    this.getUsuarios();
  }
  

  constructor(private usuariosService: UsuariosService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  filterValue!: string;

 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.filterValue = filterValue;
  this.getUsuarios();
}



getUsuarios(): void {
  const pageIndex = this.pageEvent ? this.pageEvent.pageIndex : 0;
  const pageSize = this.pageEvent ? this.pageEvent.pageSize : 10;
  const offset = pageIndex * pageSize;
  const sort = this.sortField ? `${this.sortField} ${this.sortDirection}` : '';
  
  this.usuariosService.getAll(offset, pageSize, this.filterValue, sort).subscribe(
    response => {
      this.dataSource = response.list;
      this.totalCount = response.totalCount;
    },
    error => {
      console.log('Hubo un error al recuperar los tipos de documento:', error);
    }
  );
}
  openCreateDialog(): void {
    const dialogRef = this.dialog.open(UsuariosDialogComponent, {
      width: '250px',
      data: {
        nombre: '',
        activo: false,
      } 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // "result" contiene los datos devueltos por el diálogo. En este caso, el tipo de documento a crear.
      if (result) {
        console.log(result);
        this.usuariosService.create(result).subscribe({
          next: (data) => {
            // Añadir el nuevo tipo de documento a la tabla.
            this.dataSource.push(data);
            this.getUsuarios()
          },
          error: (error) => {
            // Manejo de errores
            console.log('Hubo un error al crear el tipo de documento:', error);
          }
      });
      }
    });
    this.getUsuarios()
  }
  
  openEditDialog(usuarios: Usuarios): void {
    const dialogRef = this.dialog.open(UsuariosDialogComponent, {
      width: '250px',
      data: {...usuarios} // Hacemos una copia del objeto para no modificar el original.
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // "result" contiene los datos devueltos por el diálogo. En este caso, el tipo de documento a editar.
      if (result) {
        this.usuariosService.update(result.id, result).subscribe(
          data => {
            // Actualizar el tipo de documento en la tabla.
            const index = this.dataSource.findIndex(td => td.id === data.id);
            if (index !== -1) {
              this.dataSource[index] = data;
              this.getUsuarios()
            }
          },
          error => {
            // Manejo de errores
            console.log('Hubo un error al actualizar el tipo de documento:', error);
          }
        );
      }
    });
  }

  openDeleteDialog(usuarios: Usuarios): void {
    const dialogRef = this.dialog.open(UsuariosDeleteDialogComponent, {
      width: '250px',
      data: {...usuarios} // Hacemos una copia del objeto para no modificar el original.
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
      // "result" contiene los datos devueltos por el diálogo. En este caso, el tipo de documento a eliminar.
      if (result) {
        
        this.usuariosService.delete(result).subscribe(
          data => {
            // Eliminar el tipo de documento de la tabla.
            const index = this.dataSource.findIndex(td => td.id === data.id);
            if (index !== -1) {
              this.dataSource.splice(index, 1);
              
            }
            this.getUsuarios()
          },
          error => {
            // Manejo de errores
            console.log('Hubo un error al eliminar el tipo de documento:', error);
          }
        );
      }
    });
  }
}
