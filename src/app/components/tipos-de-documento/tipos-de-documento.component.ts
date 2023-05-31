import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TiposDeDocumentoService } from '../../services/tipos-de-documento.service';
import { TipoDeDocumento } from 'src/app/models/tipo-de-documento';
import { Observable } from 'rxjs';
import { TipoDeDocumentoDialogComponent } from '../tipo-de-documento-dialog/tipo-de-documento-dialog.component';
import { TipoDeDocumentoDeleteDialogComponent } from '../tipo-de-documento-delete-dialog/tipo-de-documento-delete-dialog.component';
@Component({
  selector: 'app-tipos-de-documento',
  templateUrl: './tipos-de-documento.component.html',
  styleUrls: ['./tipos-de-documento.component.scss']
})
export class TiposDeDocumentoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'actions'];
  dataSource: TipoDeDocumento[] = [];  // inicializa el dataSource aquí

  constructor(private tiposDeDocumentoService: TiposDeDocumentoService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTiposDeDocumento();
  }

  getTiposDeDocumento(): void {
    this.tiposDeDocumentoService.getAll().subscribe(
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
    const dialogRef = this.dialog.open(TipoDeDocumentoDialogComponent, {
      width: '250px',
      data: {} // Datos iniciales para el diálogo, en este caso vacíos para la creación.
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // "result" contiene los datos devueltos por el diálogo. En este caso, el tipo de documento a crear.
      if (result) {
        this.tiposDeDocumentoService.create(result).subscribe(
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