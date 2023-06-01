import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TipoDeIntegrante } from 'src/app/models/tipo-de-integrante';
import { TiposDeIntegranteService } from 'src/app/services/tipos-de-integrante.service';
import { TipoDeIntegranteDialogComponent } from '../tipo-de-integrante-dialog/tipo-de-integrante-dialog.component';
import { TipoDeDocumentoDeleteDialogComponent } from '../tipo-de-documento-delete-dialog/tipo-de-documento-delete-dialog.component';

@Component({
  selector: 'app-tipo-de-integrante',
  templateUrl: './tipo-de-integrante.component.html',
  styleUrls: ['./tipo-de-integrante.component.scss']
})
export class TipoDeIntegranteComponent {
  displayedColumns: string[] = ['id', 'nombre', 'orden', 'actions'];
  dataSource: TipoDeIntegrante[] = [];  // inicializa el dataSource aquí

  constructor(private tiposDeIntegranteService: TiposDeIntegranteService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTiposDeIntegrante();
  }

  getTiposDeIntegrante(): void {
    this.tiposDeIntegranteService.getAll().subscribe(
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
    const dialogRef = this.dialog.open(TipoDeIntegranteDialogComponent, {
      width: '250px',
      data: {} // Datos iniciales para el diálogo, en este caso vacíos para la creación.
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // "result" contiene los datos devueltos por el diálogo. En este caso, el tipo de documento a crear.
      if (result) {
        this.tiposDeIntegranteService.create(result).subscribe(
          data => {
            // Añadir el nuevo tipo de documento a la tabla.
            this.dataSource.push(data);
            this.getTiposDeIntegrante()
          },
          error => {
            // Manejo de errores
            console.log('Hubo un error al crear el tipo de documento:', error);
          }
        );
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
              this.dataSource[index] = data;
              this.getTiposDeIntegrante()
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
              this.dataSource.splice(index, 1);
              
            }
            this.getTiposDeIntegrante()
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
