import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LlamadosEstadosPosibles } from 'src/app/models/llamados-estados-posibles';
import { LlamadosEstadosPosiblesService } from 'src/app/services/llamados-estados-posibles.service';
import { LlamadosEstadosPosiblesDialogComponent } from '../llamados-estados-posibles-dialog/llamados-estados-posibles-dialog.component';
import { TipoDeDocumentoDeleteDialogComponent } from '../tipo-de-documento-delete-dialog/tipo-de-documento-delete-dialog.component';

@Component({
  selector: 'app-llamados-estados-posibles',
  templateUrl: './llamados-estados-posibles.component.html',
  styleUrls: ['./llamados-estados-posibles.component.scss']
})
export class LlamadosEstadosPosiblesComponent {
  displayedColumns: string[] = ['id', 'nombre', 'actions'];
  dataSource: LlamadosEstadosPosibles[] = [];  // inicializa el dataSource aquí

  constructor(private llamadosEstadosPosiblesService: LlamadosEstadosPosiblesService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTiposDeDocumento();
  }

  getTiposDeDocumento(): void {
    this.llamadosEstadosPosiblesService.getAll().subscribe(
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
    const dialogRef = this.dialog.open(LlamadosEstadosPosiblesDialogComponent, {
      width: '250px',
      data: {} // Datos iniciales para el diálogo, en este caso vacíos para la creación.
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // "result" contiene los datos devueltos por el diálogo. En este caso, el tipo de documento a crear.
      if (result) {
        this.llamadosEstadosPosiblesService.create(result).subscribe(
          data => {
            // Añadir el nuevo tipo de documento a la tabla.
            this.dataSource.push(data);
            this.getTiposDeDocumento()
          },
          error => {
            // Manejo de errores
            console.log('Hubo un error al crear el tipo de documento:', error);
          }
        );
      }
    });
    this.getTiposDeDocumento()
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
