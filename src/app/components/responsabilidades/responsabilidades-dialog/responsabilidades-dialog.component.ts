import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Areas } from 'src/app/models/areas';
import { Responsabilidades } from 'src/app/models/responsabilidades';
import { AreasService } from 'src/app/services/areas/areas.service';
import { ResponsabilidadesService } from 'src/app/services/responsabilidades/responsabilidades.service';

@Component({
  selector: 'app-responsabilidades-dialog',
  templateUrl: './responsabilidades-dialog.component.html',
  styleUrls: ['./responsabilidades-dialog.component.scss']
})
export class ResponsabilidadesDialogComponent implements OnInit{
  responsabilidadesForm: FormGroup = new FormGroup({});
  areas: Areas[] = [];

  constructor(
    private responsabilidadesService: ResponsabilidadesService,
    private areasService: AreasService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ResponsabilidadesDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Responsabilidades
  ) {}

  ngOnInit(): void {

    this.responsabilidadesForm = this.formBuilder.group({
      id: [0],
      activo: [false, Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      area: [''],
      idArea: ['', Validators.required],
    });
  
    if (this.data && this.data.id) {
      console.log(this.data);
      this.responsabilidadesForm.patchValue({
        'id': this.data.id,	
        'nombre': this.data.nombre,
        'descripcion': this.data.descripcion,
        'area': this.data.area.nombre,
        'idArea': this.data.area.id,
        'activo': this.data.activo,
      });
      
      console.log(this.responsabilidadesForm);
    }
  
    this.areasService.getAll(0, -1).subscribe(
      response => {
        this.areas = response.list;
      },
      error => {
        this.snackBar.open('Hubo un error al recuperar las áreas', 'Cerrar', { duration: 5000 });
      }
    );
  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.responsabilidadesForm.valid) {
        const responsabilidad = this.responsabilidadesForm.value;

        if (this.data && this.data.id) {
          // Modo de edición
          this.updateResponsabilidad(this.data.id, responsabilidad);
        } else {
          // Modo de creación
          this.registerResponsabilidad(responsabilidad);
        }
    }
}

  registerResponsabilidad(responsabilidad: any) {
    this.responsabilidadesService.create(responsabilidad).subscribe(
      response => {
        this.snackBar.open('Registro de responsabilidad realizado con éxito', 'Cerrar', { duration: 5000 });
        this.dialogRef.close(response);
      },
      error => {
        this.snackBar.open('Hubo un error en el registro: ' + error.error.mensaje, 'Cerrar', {
          duration: 5000,
        });
      }
    );
  }

  updateResponsabilidad(id: number, user: any) {
    console.log('Actualizando usuario:', user);
    
    this.responsabilidadesService.update(id, user).subscribe(
      response => {
        this.snackBar.open('Actualización exitosa: ', 'Cerrar', {
          duration: 5000,  
        });
      },
      error => {
        this.snackBar.open('Hubo un error en la actualización: ' + error.error.mensaje, 'Cerrar', {
          duration: 5000,
        });
      }
    );
    //close dialog
    this.dialogRef.close();
  }
}