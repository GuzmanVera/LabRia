import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Personas } from 'src/app/models/personas';
import { PersonasDialogComponent } from './personas-dialog/personas-dialog.component';
import { PersonasDeleteDialogComponent } from './personas-delete-dialog/personas-delete-dialog.component';
import { PersonasService } from 'src/app/services/personas/personas.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent {
  displayedColumns: string[] = ['id', 'primerNombre', 'activo', 'actions'];
  dataSource: Personas[] = [];  // inicializa el dataSource aquí
  totalCount: number = 0;
  pageEvent: PageEvent = { pageIndex: 0, pageSize: 10, length: 0 };
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


  constructor(private personasService: PersonasService, public dialog: MatDialog) { }

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

    this.personasService.getAll(offset, pageSize, this.filterValue, sort).subscribe(
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
    const dialogRef = this.dialog.open(PersonasDialogComponent, {
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
        this.personasService.create(result).subscribe({
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

  openEditDialog(personas: Personas): void {
    const dialogRef = this.dialog.open(PersonasDialogComponent, {
      width: '250px',
      data: { ...personas } // Hacemos una copia del objeto para no modificar el original.
    });

    dialogRef.afterClosed().subscribe(result => {
      // "result" contiene los datos devueltos por el diálogo. En este caso, el tipo de documento a editar.
      if (result) {
        this.personasService.update(result.id, result).subscribe(
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

  openDeleteDialog(personas: Personas): void {
    const dialogRef = this.dialog.open(PersonasDeleteDialogComponent, {
      width: '250px',
      data: { ...personas } // Hacemos una copia del objeto para no modificar el original.
    });

    dialogRef.afterClosed().subscribe(result => {

      // "result" contiene los datos devueltos por el diálogo. En este caso, el tipo de documento a eliminar.
      if (result) {

        this.personasService.delete(result).subscribe(
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
