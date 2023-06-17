import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuarios } from 'src/app/models/usuarios';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TiposDeDocumentoService } from 'src/app/services/tipos-de-documento/tipos-de-documento.service';
import { TipoDeDocumento } from 'src/app/models/tipo-de-documento';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-usuarios-dialog',
  templateUrl: './usuarios-dialog.component.html',
  styleUrls: ['./usuarios-dialog.component.scss']
})
export class UsuariosDialogComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});;
  docTypes: TipoDeDocumento[] = []; // Aquí se almacenarán los tipos de documentos
  fileToUpload: File | null = null;
  previewUrl:any = null;
  
  constructor(// Inyectar el servicio de tipos de documentos
    private tiposDeDocumentoService: TiposDeDocumentoService,
    private usuariosService: UsuariosService,
    public dialogRef: MatDialogRef<UsuariosDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Usuarios
  ) {}
  ngOnInit(): void {
    this.userForm = new FormGroup({
      'id': new FormControl("0"),	
      'tipoDocumentoId': new FormControl(null, Validators.required),
      'documento': new FormControl(null, Validators.required),
      'primerNombre': new FormControl(null, Validators.required),
      'segundoNombre': new FormControl(""),
      'primerApellido': new FormControl(null, Validators.required),
      'segundoApellido': new FormControl(""),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'imagen': new FormControl(""),
      'activo': new FormControl(true),
    });

    // Si estamos en modo de edición (el id está definido), deshabilita los campos que no deben ser modificables
    if (this.data && this.data.id) {
      this.userForm.controls['tipoDocumentoId'].disable();
      this.userForm.controls['documento'].disable();
      this.userForm.controls['email'].disable();

      // Carga los datos del usuario
      this.userForm.patchValue({
        'id': this.data.id,	
        'tipoDocumentoId': this.data.persona.tipoDeDocumento,
        'documento': this.data.persona.documento,
        'primerNombre': this.data.persona.primerNombre,
        'segundoNombre': this.data.persona.segundoNombre,
        'primerApellido': this.data.persona.primerApellido,
        'segundoApellido': this.data.persona.segundoApellido,
        'email': this.data.email,
        'activo': this.data.activo
      });

      if (this.data.imagen) {
        // Assign the image URL to the previewUrl property
        this.previewUrl = this.data.imagen;
      }
      
    }

    this.tiposDeDocumentoService.getAll(0, -1).subscribe(
      response => {
        this.docTypes = response.list;
        // Busca el tipo de documento con nombre 'CI'
      const defaultDocType = this.docTypes.find(docType => docType.nombre === 'CI');
      
      if (defaultDocType) {
        // Si se encuentra, establece el valor del control de formulario 'tipoDocumentoId'
        this.userForm.controls['tipoDocumentoId'].setValue(defaultDocType.id);
      }
      },
      error => {
        console.log('Hubo un error al recuperar los tipos de documento:', error);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user = this.userForm.getRawValue();
  
      if (this.fileToUpload) {
        const reader = new FileReader();
        reader.readAsDataURL(this.fileToUpload);
        reader.onload = () => {
          user.imagen = reader.result as string;
          // Llamar a la función correspondiente dependiendo de si estamos en el modo de creación o en el modo de edición
          if (this.data && this.data.id) {
            // Modo de edición
            this.updateUser(this.data.id, user);
          } else {
            // Modo de creación
            this.registerUser(user);
          }
        };
        reader.onerror = error => console.log(error);
      } else {
        // Llamar a la función correspondiente dependiendo de si estamos en el modo de creación o en el modo de edición
        if (this.data && this.data.id) {
          // Modo de edición
          this.updateUser(this.data.id, user);
        } else {
          // Modo de creación
          this.registerUser(user);
        }
      }
    }
  }
  
  // Aquí está la función de actualización
  updateUser(id: number, user: any) {
    
    this.usuariosService.update(user).subscribe(
      response => {
        this.snackBar.open('Actualización exitosa: ' + response.mensaje, 'Cerrar', {
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
  
  
  registerUser(user: any) {
    this.usuariosService.register(user).subscribe(
      response => {
        if (response.status) {
          this.snackBar.open('Registro exitoso: ' + response.mensaje, 'Cerrar', {
            duration: 5000,  // Duración en milisegundos después de la cual se cerrará automáticamente el snack-bar
          });
        } else {
          this.snackBar.open('Registro fallido: ' + response.mensaje, 'Cerrar', {
            duration: 5000,
          });
        }
      },
      error => {
         
        this.snackBar.open('Hubo un error en el registro: ' + error.error.mensaje, 'Cerrar', {
          duration: 5000,
        });
      }
    );
  }
  

  onFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files.length > 0) {
      const file = target.files[0];
      this.userForm.get('imagen')?.setValue(file);
    }
  }

  handleFileInput(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      this.fileToUpload = files.item(0);
  
      // File Preview
      const reader = new FileReader();
      reader.onload = (event:any) => {
        this.previewUrl = event.target.result;
      }
      if(this.fileToUpload){
        reader.readAsDataURL(this.fileToUpload);
      }
    }
  }
  
  
  
  
}
