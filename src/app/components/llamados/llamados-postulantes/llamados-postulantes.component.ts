import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgregarPostulanteComponent } from './agregar-postulante/agregar-postulante.component';
import { MatDialog } from '@angular/material/dialog';
import { EditarPostulanteComponent } from './editar-postulante/editar-postulante.component';
import { EliminarPostulanteComponent } from './eliminar-postulante/eliminar-postulante.component';
@Component({
  selector: 'app-llamados-postulantes',
  templateUrl: './llamados-postulantes.component.html',
  styleUrls: ['./llamados-postulantes.component.scss']
})
export class LlamadosPostulantesComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,
  ) {}

  // Aquí puedes usar `this.data` para acceder a los datos del llamado,
  // y `this.data.postulantes` para acceder a la lista de postulantes.
  openAgregarPostulanteDialog(element: any): void {
    this.dialog.open(AgregarPostulanteComponent, {
      width: '300px',
      data: {...element}
    });
  }

  openEditarPostulanteDialog(postulante: any): void {
    this.dialog.open(EditarPostulanteComponent, {
      width: '300px',
      data: {...postulante}
    });
  }

  openEliminarPostulanteDialog(postulante: any): void {
     this.dialog.open(EliminarPostulanteComponent, {
       width: '400px',
       data: {...postulante}
     });
  }
}


