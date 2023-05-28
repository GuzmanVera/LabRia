import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TiposDeDocumentoService } from '../../services/tipos-de-documento.service';
import { TipoDeDocumento } from 'src/app/models/tipo-de-documento';
import { Observable } from 'rxjs';

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

  // Aquí puedes añadir las funciones para abrir los diálogos de creación, edición y eliminación.
  // openCreateDialog(), openEditDialog(tipoDeDocumento), openDeleteDialog(tipoDeDocumento)

}