import { Component, Inject, OnInit  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LlamadosEstadosPosibles } from 'src/app/models/llamados-estados-posibles';
import { LlamadosEstadosPosiblesService } from 'src/app/services/llamados-estados-posibles/llamados-estados-posibles.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl } from '@angular/forms';
import { LlamadosService} from 'src/app/services/llamados/llamados.service';

@Component({
  selector: 'app-llamados-modificar-estados',
  templateUrl: './llamados-modificar-estados.component.html',
  styleUrls: ['./llamados-modificar-estados.component.scss']
})
export class LlamadosModificarEstadosComponent implements OnInit {
  form: FormGroup;
  estados: LlamadosEstadosPosibles[] = [];

  constructor(
    public dialogRef: MatDialogRef<LlamadosModificarEstadosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private llamadosEstadosPosiblesService: LlamadosEstadosPosiblesService, 
    private llamadosService: LlamadosService,
    private snackBar: MatSnackBar
  ) { 
    this.form = new FormGroup({
      idEstado: new FormControl(null),
      observaciones: new FormControl('') // Aquí se añade el nuevo FormControl
    });
  }

  ngOnInit(): void {
    this.llamadosEstadosPosiblesService.getAll(0, -1).subscribe(
      response => {
        this.estados = response.list;
      },
      error => {
        this.snackBar.open('Hubo un error al recuperar las áreas', 'Cerrar', { duration: 5000 });
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      const { idEstado, observaciones } = this.form.value;
      let user = "";
      if( localStorage.getItem('email') != null){
        user = localStorage.getItem('email') || ""; 
      }
      
      this.llamadosService.modificarEstado(user, observaciones, this.data.id, idEstado)
        .subscribe(response => {
          this.dialogRef.close(true);
        }, error => {
          this.snackBar.open('Hubo un error al modificar el estado', 'Cerrar', { duration: 5000 });
        });
    }
  }
}
