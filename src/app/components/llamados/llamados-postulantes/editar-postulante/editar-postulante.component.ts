import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostulantesService } from 'src/app/services/postulantes/postulantes.service';

@Component({
  selector: 'app-editar-postulante',
  templateUrl: './editar-postulante.component.html',
  styleUrls: ['./editar-postulante.component.scss']
})

export class EditarPostulanteComponent implements OnInit {
  postulanteForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditarPostulanteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postulantesService: PostulantesService
  ) {
    this.postulanteForm = new FormGroup({
      fechaHoraEntrevista: new FormControl(data.fechaHoraEntrevista),
      estudioMeritosRealizado: new FormControl(data.estudioMeritosRealizado),
      entrevistaRealizada: new FormControl(data.entrevistaRealizada)
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    const updateData = {
      id: this.data.id,
      activo: true,
      llamadoId: this.data.llamadoId,
      personaId: this.data.personaId,
      ...this.postulanteForm.value
    };
    this.postulantesService.update(this.data.id, updateData).subscribe(
      () => this.dialogRef.close(),
      error => console.error(error)
    );
  }

    
  onNoClick(): void {
    this.dialogRef.close();
  }
  

}
