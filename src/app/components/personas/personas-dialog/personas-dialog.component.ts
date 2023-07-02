import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Personas } from 'src/app/models/personas';
import { TipoDeDocumento } from 'src/app/models/tipo-de-documento';
import { PersonasService } from 'src/app/services/personas/personas.service';
import { TiposDeDocumentoService } from 'src/app/services/tipos-de-documento/tipos-de-documento.service';

@Component({
  selector: 'app-personas-dialog',
  templateUrl: './personas-dialog.component.html',
  styleUrls: ['./personas-dialog.component.scss'],
})
export class PersonasDialogComponent implements OnInit {
  PersonasForm: FormGroup = new FormGroup({});
  docTypes: TipoDeDocumento[] = [];

  constructor(
    public dialogRef: MatDialogRef<PersonasDialogComponent>,
    private tiposDeDocumentoService: TiposDeDocumentoService,
    private personasService: PersonasService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Personas
  ) {}

  ngOnInit(): void {
    this.tiposDeDocumentoService.getAll(0, -1).subscribe(
      (response) => {
        this.docTypes = response.list;

        // Encuentra el area correspondiente en la lista de areas
        if (this.data && this.data.documento) {
          const documento = this.docTypes.find(
            (documento) => documento.id === this.data.tipoDeDocumento.id
          );
          if (documento) {
            this.PersonasForm.patchValue({
              tipoDeDocumento: documento.id,
            });
          }
        }
      },
      (error) => {
        this.snackBar.open('Hubo un error al recuperar las áreas', 'Cerrar', {
          duration: 5000,
        });
      }
    );

    this.PersonasForm = this.formBuilder.group({
      id: [0],
      activo: [false, Validators.required],
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      idTipoDeDocumento: ['', Validators.required],
      documento: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.PersonasForm.valid) {
      const persona = this.PersonasForm.value;
      this.registerPersona(persona);
    }
  }

  registerPersona(persona: any) {
    this.personasService.create(persona).subscribe(
      response => {
        this.snackBar.open('Registro de persona realizado con éxito', 'Cerrar', { duration: 5000 });
        this.dialogRef.close(response);
      },
      error => {
        this.snackBar.open('Hubo un error en el registro: ' + error.error.mensaje, 'Cerrar', {
          duration: 5000,
        });
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
