import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Llamados } from 'src/app/models/llamados';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MiembrosTribunalesService } from 'src/app/services/miembros-tribunales/miembros-tribunales.service';


@Component({
  selector: 'app-llamados-delete-dialog',
  templateUrl: './llamados-delete-dialog.component.html',
  styleUrls: ['./llamados-delete-dialog.component.scss']
})
export class LlamadosDeleteDialogComponent {
  renunciaForm: FormGroup;
  personaId?: number;  

  constructor(
    public dialogRef: MatDialogRef<LlamadosDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public miembro: any,
    private fb: FormBuilder,
    private miembrosTribunalesService: MiembrosTribunalesService
  ) {
    
    this.renunciaForm = this.fb.group({
      motivoRenuncia: ['', Validators.required]
    });
  }

  renunciar(): void {
    const motivoRenunciaControl = this.renunciaForm.get('motivoRenuncia');
    const motivoRenuncia = motivoRenunciaControl ? motivoRenunciaControl.value : '';

    this.miembrosTribunalesService.renunciar(this.data.miembro.id , this.data.llamado.id, this.data.miembro.personaId, this.data.miembro.tipoDeIntegranteId , motivoRenuncia )
    .subscribe(() => this.dialogRef.close());
  
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }
}
