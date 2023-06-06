import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Areas } from 'src/app/models/areas';
import { AreasService } from 'src/app/services/areas/areas.service';
import { AreasDialogComponent } from './areas-dialog/areas-dialog.component';
import { AreasDeleteDialogComponent } from './areas-delete-dialog/areas-delete-dialog.component';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent {
  displayedColumns: string[] = ['id', 'nombre', 'activo', 'actions'];
  dataSource: Areas[] = [];  // inicializa el dataSource aquí
  totalCount: number = 0;
  pageEvent: PageEvent = {pageIndex: 0, pageSize: 10, length: 0};
  sortDirection: 'asc' | 'desc' = 'asc'; // Dirección de la ordenación
  sortField: string = ''; // Campo de ordenación

  constructor(private AreasService: AreasService, public dialog: MatDialog) {}

  onPaginateChange(event: PageEvent) {
    this.pageEvent = event;
    
    this.getAreas();
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
    this.getAreas();
  }

  ngOnInit(): void {
    this.getAreas();
  }

  filterValue!: string;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue;
    this.getAreas();
  }

  getAreas(): void {
    const pageIndex = this.pageEvent ? this.pageEvent.pageIndex : 0;
    const pageSize = this.pageEvent ? this.pageEvent.pageSize : 10;
    const offset = pageIndex * pageSize;
    const sort = this.sortField ? `${this.sortField} ${this.sortDirection}` : '';

    this.AreasService.getAll(offset, pageSize, this.filterValue, sort).subscribe(
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
    const dialogRef = this.dialog.open(AreasDialogComponent, {
      width: '250px',
      data: {
        nombre: '',
        activo: false,
      } 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.AreasService.create(result).subscribe({
          next: (data) => {
            this.dataSource.push(data);
            this.getAreas()
          },
          error: (error) => {
            console.log('Hubo un error al crear el tipo de documento:', error);
          }
        });
      }
    });
    this.getAreas()
  }
  
  
  openEditDialog(areas: Areas): void {
    const dialogRef = this.dialog.open(AreasDialogComponent, {
      width: '250px',
      data: {...areas} // Hacemos una copia del objeto para no modificar el original.
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // "result" contiene los datos devueltos por el diálogo. En este caso, el tipo de documento a editar.
      if (result) {
        this.AreasService.update(result.id, result).subscribe(
          data => {
            // Actualizar el tipo de documento en la tabla.
            const index = this.dataSource.findIndex(td => td.id === data.id);
            if (index !== -1) {
              this.dataSource[index] = data;
              this.getAreas()
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

  openDeleteDialog(areas: Areas): void {
    const dialogRef = this.dialog.open(AreasDeleteDialogComponent, {
      width: '250px',
      data: {...areas} // Hacemos una copia del objeto para no modificar el original.
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
      // "result" contiene los datos devueltos por el diálogo. En este caso, el tipo de documento a eliminar.
      if (result) {
        
        this.AreasService.delete(result).subscribe(
          data => {
            // Eliminar el tipo de documento de la tabla.
            const index = this.dataSource.findIndex(td => td.id === data.id);
            if (index !== -1) {
              this.dataSource.splice(index, 1);
              
            }
            this.getAreas()
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
