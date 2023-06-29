import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostulantesService } from 'src/app/services/postulantes/postulantes.service';
@Component({
  selector: 'app-eliminar-postulante',
  templateUrl: './eliminar-postulante.component.html',
  styleUrls: ['./eliminar-postulante.component.scss']
})
export class EliminarPostulanteComponent {
  constructor(
    public dialogRef: MatDialogRef<EliminarPostulanteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postulantesService: PostulantesService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  eliminarPostulante(): void {
    this.postulantesService.delete(this.data.id).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
