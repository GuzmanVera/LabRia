import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { UsuariosDialogComponent } from './usuarios-dialog/usuarios-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosRoleDialogComponent } from './usuarios-role-dialog/usuarios-role-dialog.component';

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
  

  constructor(private usuariosService: UsuariosService, public dialog: MatDialog) {}

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
      console.log('Hubo un error al recuperar los tipos de documento:', error);
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
        console.log(result);
        this.usuariosService.create(result).subscribe({
          next: (data) => {
            // Añadir el nuevo tipo de documento a la tabla.
            this.dataSource.push(data);
            this.getUsuarios(this.selectedField)
          },
          error: (error) => {
            // Manejo de errores
            console.log('Hubo un error al crear el tipo de documento:', error);
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
      //refresh the page
      this.getUsuarios(this.selectedField);
        
    });
  }

  openRoleDialog(usuarios: Usuarios): void { //tiene la logia del eliminar, hay que cambiarla uwu
    const dialogRef = this.dialog.open(UsuariosRoleDialogComponent, {
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
            this.getUsuarios(this.selectedField)
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
