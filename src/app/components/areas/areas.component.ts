import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Areas } from 'src/app/models/areas';
import { AreasService } from 'src/app/services/areas.service';
import { AreasDialogComponent } from '../areas-dialog/areas-dialog.component';
import { AreasDeleteDialogComponent } from '../areas-delete-dialog/areas-delete-dialog.component';


@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent {
  displayedColumns: string[] = ['id', 'nombre', 'actions'];
  dataSource: Areas[] = [];  // inicializa el dataSource aquí

  constructor(private AreasService: AreasService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAreas();
  }

  getAreas(): void {
    this.AreasService.getAll().subscribe(
      data => {
        this.dataSource = data;
      },
      error => {
        // Manejo de errores
        console.log('Hubo un error al recuperar los tipos de documento:', error);
      }
    );
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(AreasDialogComponent, {
      width: '250px',
      data: {} // Datos iniciales para el diálogo, en este caso vacíos para la creación.
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // "result" contiene los datos devueltos por el diálogo. En este caso, el tipo de documento a crear.
      if (result) {
        this.AreasService.create(result).subscribe(
          data => {
            // Añadir el nuevo tipo de documento a la tabla.
            this.dataSource.push(data);
            this.getAreas()
          },
          error => {
            // Manejo de errores
            console.log('Hubo un error al crear el tipo de documento:', error);
          }
        );
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
