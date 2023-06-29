import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Responsabilidades } from 'src/app/models/responsabilidades';
import { ResponsabilidadesService } from 'src/app/services/responsabilidades/responsabilidades.service';
import { ResponsabilidadesDialogComponent } from './responsabilidades-dialog/responsabilidades-dialog.component';
import { ResponsabilidadesDeleteDialogComponent } from './responsabilidades-delete-dialog/responsabilidades-delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-responsabilidades',
  templateUrl: './responsabilidades.component.html',
  styleUrls: ['./responsabilidades.component.scss']
})
export class ResponsabilidadesComponent implements OnInit{
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'area', 'activo', 'actions'];
  dataSource: Responsabilidades[] = [];  // inicializa el dataSource aquí
  totalCount: number = 0;
  pageEvent: PageEvent = {pageIndex: 0, pageSize: 10, length: 0};
  sortDirection: 'asc' | 'desc' = 'asc'; // Dirección de la ordenación
  sortField: string = ''; // Campo de ordenación

  selectedField: string = 'nombre';  // Campo inicial para el filtro.

  onPaginateChange(event: PageEvent) {
    this.pageEvent = event;
    
    this.getResponsabilidades(this.selectedField);
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
    this.getResponsabilidades(this.selectedField);
  }
  

  constructor(private responsabilidadesService: ResponsabilidadesService, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getResponsabilidades(this.selectedField);
  }

  filterValue!: string;

 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.filterValue = filterValue;
  this.getResponsabilidades(this.selectedField);
}



getResponsabilidades(field: string): void {
  const pageIndex = this.pageEvent ? this.pageEvent.pageIndex : 0;
  const pageSize = this.pageEvent ? this.pageEvent.pageSize : 10;
  const offset = pageIndex * pageSize;
  const sort = this.sortField ? `${this.sortField} ${this.sortDirection}` : '';
  
  this.responsabilidadesService.getAll(offset, pageSize, this.filterValue, sort).subscribe(
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
  const dialogRef = this.dialog.open(ResponsabilidadesDialogComponent, {
    width: '300px',
    data: {
      id: null,
      nombre: '',
      descripcion: '',
      area: null,
      activo: false,
      // agregar el resto de las propiedades de Llamados aquí si las hay
    } 
  });

  dialogRef.afterClosed().subscribe(result => {
    // "result" contiene los datos devueltos por el diálogo. En este caso, el tipo de documento a crear.
    this.getResponsabilidades(this.selectedField)
  });
  
}
  
  openEditDialog(Responsabilidades: Responsabilidades): void {
    const dialogRef = this.dialog.open(ResponsabilidadesDialogComponent, {
      width: '250px',
      data: {...Responsabilidades}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.getResponsabilidades(this.selectedField);
      this.snackBar.open('Usuario editado con éxito', 'Cerrar', { duration: 5000 });
    });
  }

  openDeleteDialog(Responsabilidades: Responsabilidades): void {
    const dialogRef = this.dialog.open(ResponsabilidadesDeleteDialogComponent, {
      width: '250px',
      data: {...Responsabilidades}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.responsabilidadesService.delete(result).subscribe(
          data => {
            this.getResponsabilidades(this.selectedField);
          },
          error => {
            console.log('Hubo un error al eliminar el tipo de documento:', error);
          }
        );
      }
    });
  }
}