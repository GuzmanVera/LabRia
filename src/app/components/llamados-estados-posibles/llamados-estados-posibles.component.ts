import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LlamadosEstadosPosibles } from 'src/app/models/llamados-estados-posibles';
import { LlamadosEstadosPosiblesService } from 'src/app/services/llamados-estados-posibles/llamados-estados-posibles.service';
import { LlamadosEstadosPosiblesDialogComponent } from './llamados-estados-posibles-dialog/llamados-estados-posibles-dialog.component';
import { TipoDeDocumentoDeleteDialogComponent } from '../tipos-de-documento/tipo-de-documento-delete-dialog/tipo-de-documento-delete-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-llamados-estados-posibles',
  templateUrl: './llamados-estados-posibles.component.html',
  styleUrls: ['./llamados-estados-posibles.component.scss']
})
export class LlamadosEstadosPosiblesComponent {
  displayedColumns: string[] = ['id', 'nombre', 'activo', 'actions'];
  dataSource: LlamadosEstadosPosibles[] = [];  // inicializa el dataSource aquí
  totalCount: number = 0;
  pageEvent: PageEvent = {pageIndex: 0, pageSize: 10, length: 0};
  sortDirection: 'asc' | 'desc' = 'asc'; // Dirección de la ordenación
  sortField: string = ''; // Campo de ordenación

  onPaginateChange(event: PageEvent) {
    this.pageEvent = event;
    
    this.getLlamadosEstadosPosibles();
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
    this.getLlamadosEstadosPosibles();
  }

  constructor(private llamadosEstadosPosiblesService: LlamadosEstadosPosiblesService, public dialog: MatDialog,  private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getLlamadosEstadosPosibles();
  }

  filterValue!: string;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue;
    this.getLlamadosEstadosPosibles();
  }

  getLlamadosEstadosPosibles(): void {
    const pageIndex = this.pageEvent ? this.pageEvent.pageIndex : 0;
    const pageSize = this.pageEvent ? this.pageEvent.pageSize : 10;
    const offset = pageIndex * pageSize;
    const sort = this.sortField ? `${this.sortField} ${this.sortDirection}` : '';

    this.llamadosEstadosPosiblesService.getAll(offset, pageSize, this.filterValue, sort).subscribe(
      response => {
        this.dataSource = response.list;
        this.totalCount = response.totalCount;
      },
      error => {
        this.snackBar.open('Hubo un error al obtener los estados posibles', 'Cerrar', { duration: 5000 });
      }
    );
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(LlamadosEstadosPosiblesDialogComponent, {
      width: '250px',
      data: {
        nombre: '',
        activo: false,
      } 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.llamadosEstadosPosiblesService.create(result).subscribe({
          next: (data) => {
            this.snackBar.open('Registro añadido con éxito', 'Cerrar', { duration: 5000 });
            this.dataSource.push(data);
            this.getLlamadosEstadosPosibles()
          },
          error: (error) => {
            this.snackBar.open('Hubo un error al crear el registro', 'Cerrar', { duration: 5000 });
          }
        });
      }
    });
    this.getLlamadosEstadosPosibles()
  }
  
  openEditDialog(llamadosEstadosPosibles: LlamadosEstadosPosibles): void {
    const dialogRef = this.dialog.open(LlamadosEstadosPosiblesDialogComponent, {
      width: '250px',
      data: {...llamadosEstadosPosibles} // Hacemos una copia del objeto para no modificar el original.
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // "result" contiene los datos devueltos por el diálogo. En este caso, el tipo de documento a editar.
      if (result) {
        this.llamadosEstadosPosiblesService.update(result.id, result).subscribe(
          data => {
            // Actualizar el tipo de documento en la tabla.
            const index = this.dataSource.findIndex(td => td.id === data.id);
            if (index !== -1) {
              this.snackBar.open('Registro actualizada con éxito', 'Cerrar', { duration: 5000 });
              this.dataSource[index] = data;
              this.getLlamadosEstadosPosibles()
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

  openDeleteDialog(llamadosEstadosPosibles: LlamadosEstadosPosibles): void {
    const dialogRef = this.dialog.open(TipoDeDocumentoDeleteDialogComponent, {
      width: '250px',
      data: {...llamadosEstadosPosibles} // Hacemos una copia del objeto para no modificar el original.
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
      // "result" contiene los datos devueltos por el diálogo. En este caso, el tipo de documento a eliminar.
      if (result) {
        
        this.llamadosEstadosPosiblesService.delete(result).subscribe(
          data => {
            // Eliminar el tipo de documento de la tabla.
            const index = this.dataSource.findIndex(td => td.id === data.id);
            if (index !== -1) {
              this.snackBar.open('Registro eliminado con éxito', 'Cerrar', { duration: 5000 });
              this.dataSource.splice(index, 1);
              
            }
            this.getLlamadosEstadosPosibles()
          },
          error => {
            // Manejo de errores
            this.snackBar.open('Hubo un error al intentar eliminar el registro', 'Cerrar', { duration: 5000 });
          }
        );
      }
    });
  }
}
