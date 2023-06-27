import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TipoDeIntegrante } from 'src/app/models/tipo-de-integrante';
import { TiposDeIntegranteService } from 'src/app/services/tipos-de-integrante/tipos-de-integrante.service';
import { TipoDeIntegranteDialogComponent } from './tipo-de-integrante-dialog/tipo-de-integrante-dialog.component';
import { TipoDeDocumentoDeleteDialogComponent } from '../tipos-de-documento/tipo-de-documento-delete-dialog/tipo-de-documento-delete-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-tipo-de-integrante',
  templateUrl: './tipo-de-integrante.component.html',
  styleUrls: ['./tipo-de-integrante.component.scss']
})
export class TipoDeIntegranteComponent {
  displayedColumns: string[] = ['id', 'nombre','activo', 'orden', 'actions'];
  dataSource: TipoDeIntegrante[] = [];  // inicializa el dataSource aquí
  totalCount: number = 0;
  pageEvent: PageEvent = {pageIndex: 0, pageSize: 10, length: 0};
  sortDirection: 'asc' | 'desc' = 'asc'; // Dirección de la ordenación
  sortField: string = ''; // Campo de ordenación

  onPaginateChange(event: PageEvent) {
    this.pageEvent = event;
    
    this.getTiposDeIntegrante();
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
    this.getTiposDeIntegrante();
  }

  constructor(private tiposDeIntegranteService: TiposDeIntegranteService, public dialog: MatDialog,  private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getTiposDeIntegrante();
  }

  filterValue!: string;

 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.filterValue = filterValue;
  this.getTiposDeIntegrante();
}

  getTiposDeIntegrante(): void {
    const pageIndex = this.pageEvent ? this.pageEvent.pageIndex : 0;
    const pageSize = this.pageEvent ? this.pageEvent.pageSize : 10;
    const offset = pageIndex * pageSize;
    const sort = this.sortField ? `${this.sortField} ${this.sortDirection}` : '';

    this.tiposDeIntegranteService.getAll(offset, pageSize, this.filterValue, sort).subscribe(
      response => {
        this.dataSource = response.list;
        this.totalCount = response.totalCount;
      },
      error => {
        this.snackBar.open('Ocurrió un error al recuperar los tipos de integrante', 'Cerrar', { duration: 5000 });
      }
    );
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(TipoDeIntegranteDialogComponent, {
      width: '250px',
      data: {
        nombre: '',
        activo: false,
      } // Datos iniciales para el diálogo, en este caso vacíos para la creación.
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // "result" contiene los datos devueltos por el diálogo. En este caso, el tipo de documento a crear.
      if (result) {
        this.tiposDeIntegranteService.create(result).subscribe({
          next: (data) => {
            // Añadir el nuevo tipo de documento a la tabla.
            this.snackBar.open('Tipo de integrante creado con éxito', 'Cerrar', { duration: 5000 });
            this.dataSource.push(data);
            this.getTiposDeIntegrante()
          },
          error: (error) => {
            // Manejo de errores
            this.snackBar.open('Ocurrió un problema al crear el tipo de integrante', 'Cerrar', { duration: 5000 });

          }
        });
      }
    });
    this.getTiposDeIntegrante()
  }
  
  openEditDialog(tipoDeIntegrante: TipoDeIntegrante): void {
    const dialogRef = this.dialog.open(TipoDeIntegranteDialogComponent, {
      width: '250px',
      data: {...tipoDeIntegrante} // Hacemos una copia del objeto para no modificar el original.
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // "result" contiene los datos devueltos por el diálogo. En este caso, el tipo de documento a editar.
      if (result) {
        this.tiposDeIntegranteService.update(result.id, result).subscribe(
          data => {
            // Actualizar el tipo de documento en la tabla.
            const index = this.dataSource.findIndex(td => td.id === data.id);
            if (index !== -1) {
              this.snackBar.open('Tipo de integrante actualizado con éxito', 'Cerrar', { duration: 5000 });
              this.dataSource[index] = data;
              this.getTiposDeIntegrante()
            }
          },
          error => {
            // Manejo de errores
            this.snackBar.open('Hubo un error durante la actualización', 'Cerrar', { duration: 5000 });
          }
        );
      }
    });
  }

  openDeleteDialog(tipoDeIntegrante: TipoDeIntegrante): void {
    const dialogRef = this.dialog.open(TipoDeDocumentoDeleteDialogComponent, {
      width: '250px',
      data: {...tipoDeIntegrante} // Hacemos una copia del objeto para no modificar el original.
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
      // "result" contiene los datos devueltos por el diálogo. En este caso, el tipo de documento a eliminar.
      if (result) {
        
        this.tiposDeIntegranteService.delete(result).subscribe(
          data => {
            // Eliminar el tipo de documento de la tabla.
            const index = this.dataSource.findIndex(td => td.id === data.id);
            if (index !== -1) {
              this.snackBar.open('Tipo de integrante eliminado con éxito', 'Cerrar', { duration: 5000 });
              this.dataSource.splice(index, 1);
              
            }
            this.getTiposDeIntegrante()
          },
          error => {
            // Manejo de errores
            this.snackBar.open('Hubo un error al eliminar el tipo de integrante', 'Cerrar', { duration: 5000 });
          }
        );
      }
    });
  }
}