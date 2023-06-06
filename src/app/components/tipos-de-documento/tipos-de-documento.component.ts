import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TiposDeDocumentoService } from '../../services/tipos-de-documento/tipos-de-documento.service';
import { TipoDeDocumento } from 'src/app/models/tipo-de-documento';
import { Observable } from 'rxjs';
import { TipoDeDocumentoDialogComponent } from './tipo-de-documento-dialog/tipo-de-documento-dialog.component';
import { TipoDeDocumentoDeleteDialogComponent } from './tipo-de-documento-delete-dialog/tipo-de-documento-delete-dialog.component';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-tipos-de-documento',
  templateUrl: './tipos-de-documento.component.html',
  styleUrls: ['./tipos-de-documento.component.scss']
})
export class TiposDeDocumentoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'activo', 'actions'];
  dataSource: TipoDeDocumento[] = [];  // inicializa el dataSource aquí
  totalCount: number = 0;
  pageEvent: PageEvent = {pageIndex: 0, pageSize: 10, length: 0};
  sortDirection: 'asc' | 'desc' = 'asc'; // Dirección de la ordenación
  sortField: string = ''; // Campo de ordenación


  onPaginateChange(event: PageEvent) {
    this.pageEvent = event;
    
    this.getTiposDeDocumento();
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
    this.getTiposDeDocumento();
  }
  

  constructor(private tiposDeDocumentoService: TiposDeDocumentoService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTiposDeDocumento();
  }

  filterValue!: string;

 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.filterValue = filterValue;
  this.getTiposDeDocumento();
}



getTiposDeDocumento(): void {
  const pageIndex = this.pageEvent ? this.pageEvent.pageIndex : 0;
  const pageSize = this.pageEvent ? this.pageEvent.pageSize : 10;
  const offset = pageIndex * pageSize;
  const sort = this.sortField ? `${this.sortField} ${this.sortDirection}` : '';
  
  this.tiposDeDocumentoService.getAll(offset, pageSize, this.filterValue, sort).subscribe(
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
    const dialogRef = this.dialog.open(TipoDeDocumentoDialogComponent, {
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
        this.tiposDeDocumentoService.create(result).subscribe({
          next: (data) => {
            // Añadir el nuevo tipo de documento a la tabla.
            this.dataSource.push(data);
            this.getTiposDeDocumento()
          },
          error: (error) => {
            // Manejo de errores
            console.log('Hubo un error al crear el tipo de documento:', error);
          }
      });
      }
    });
    this.getTiposDeDocumento()
  }
  
  openEditDialog(tipoDeDocumento: TipoDeDocumento): void {
    const dialogRef = this.dialog.open(TipoDeDocumentoDialogComponent, {
      width: '250px',
      data: {...tipoDeDocumento} // Hacemos una copia del objeto para no modificar el original.
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // "result" contiene los datos devueltos por el diálogo. En este caso, el tipo de documento a editar.
      if (result) {
        this.tiposDeDocumentoService.update(result.id, result).subscribe(
          data => {
            // Actualizar el tipo de documento en la tabla.
            const index = this.dataSource.findIndex(td => td.id === data.id);
            if (index !== -1) {
              this.dataSource[index] = data;
              this.getTiposDeDocumento()
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

  openDeleteDialog(tipoDeDocumento: TipoDeDocumento): void {
    const dialogRef = this.dialog.open(TipoDeDocumentoDeleteDialogComponent, {
      width: '250px',
      data: {...tipoDeDocumento} // Hacemos una copia del objeto para no modificar el original.
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
      // "result" contiene los datos devueltos por el diálogo. En este caso, el tipo de documento a eliminar.
      if (result) {
        
        this.tiposDeDocumentoService.delete(result).subscribe(
          data => {
            // Eliminar el tipo de documento de la tabla.
            const index = this.dataSource.findIndex(td => td.id === data.id);
            if (index !== -1) {
              this.dataSource.splice(index, 1);
              
            }
            this.getTiposDeDocumento()
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