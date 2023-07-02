import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Areas } from 'src/app/models/areas';
import { Llamados } from 'src/app/models/llamados';
import { AreasService } from 'src/app/services/areas/areas.service';
import { LlamadosService } from 'src/app/services/llamados/llamados.service';

@Component({
  selector: 'app-llamados-dialog',
  templateUrl: './llamados-dialog.component.html',
  styleUrls: ['./llamados-dialog.component.scss']
})
export class LlamadosDialogComponent implements OnInit {
  llamadosForm: FormGroup = new FormGroup({});
  areas: Areas[] = [];

  constructor(
    private llamadosService: LlamadosService,
    private areasService: AreasService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LlamadosDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Llamados
  ) {}

  ngOnInit(): void {
    this.areasService.getAll(0, -1).subscribe(
      response => {
        this.areas = response.list;
  
        // Encuentra el area correspondiente en la lista de areas
        if (this.data && this.data.idArea) {
          const area = this.areas.find(area => area.id === this.data.idArea);
          if (area) {
            this.llamadosForm.patchValue({
              idArea: area.id
            });
          }
        }
      },
      error => {
        this.snackBar.open('Hubo un error al recuperar las áreas', 'Cerrar', { duration: 5000 });
      }
    );

    this.llamadosForm = this.formBuilder.group({
      id: [0],
      activo: [false, Validators.required],
      identificador: ['', Validators.required],
      nombre: ['', Validators.required],
      linkPlanillaPuntajes: ['', Validators.required],
      linkActa: ['', Validators.required],
      minutosEntrevista: ['', Validators.required],
      idArea: ['', Validators.required],
  });

  
    if (this.data && this.data.id) {
      console.log(this.data);
      this.llamadosForm.patchValue({
        'id': this.data.id,	
        'activo': this.data.activo,
        'identificador': this.data.identificador,
        'nombre': this.data.nombre,
        'linkPlanillaPuntajes': this.data.linkPlanillaPuntajes,
        'linkActa': this.data.linkActa,
        'minutosEntrevista': this.data.minutosEntrevista,
        'area': this.data.area.nombre,
        'idArea': this.data.area.id,
      });
    }
  }

  

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.llamadosForm.valid) {
      const llamado = this.llamadosForm.value;
      if (this.data) { // En caso de edición
        this.updateLlamado(llamado);
      } else { // En caso de creación
        this.registerLlamado(llamado);
      }
    }
}

  registerLlamado(llamado: any) {
    this.llamadosService.create(llamado).subscribe(
      response => {
        this.snackBar.open('Registro de llamado realizado con éxito', 'Cerrar', { duration: 5000 });
        this.dialogRef.close(response);
      },
      error => {
        this.snackBar.open('Hubo un error en el registro: ' + error.error.mensaje, 'Cerrar', {
          duration: 5000,
        });
      }
    );
  }

  updateLlamado(llamado: any) {
    this.llamadosService.update(this.data.id, llamado).subscribe(
      response => {
        this.snackBar.open('LLamado actualizado con éxito', 'Cerrar', { duration: 5000 });

        this.dialogRef.close(response);
      },
      error => {
        this.snackBar.open('Hubo un error en la actualización: ' + error.error.mensaje, 'Cerrar', {
          duration: 5000,
        });
      }
    );
  }
}