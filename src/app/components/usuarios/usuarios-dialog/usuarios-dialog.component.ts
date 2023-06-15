import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuarios } from 'src/app/models/usuarios';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TiposDeDocumentoService } from 'src/app/services/tipos-de-documento/tipos-de-documento.service';
import { TipoDeDocumento } from 'src/app/models/tipo-de-documento';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';


@Component({
  selector: 'app-usuarios-dialog',
  templateUrl: './usuarios-dialog.component.html',
  styleUrls: ['./usuarios-dialog.component.scss']
})
export class UsuariosDialogComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});;
  docTypes: TipoDeDocumento[] = []; // Aquí se almacenarán los tipos de documentos
  fileToUpload: File | null = null;

  constructor(// Inyectar el servicio de tipos de documentos
    private tiposDeDocumentoService: TiposDeDocumentoService,
    private usuariosService: UsuariosService,
    public dialogRef: MatDialogRef<UsuariosDialogComponent>,
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

    this.tiposDeDocumentoService.getAll(0, -1).subscribe(
      response => {
        this.docTypes = response.list;
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
      const user = this.userForm.value;
  
      if (this.fileToUpload) {
        const reader = new FileReader();
        reader.readAsDataURL(this.fileToUpload);
        reader.onload = () => {
          user.imagen = reader.result as string;
          this.registerUser(user);
        };
        reader.onerror = error => console.log(error);
      } else {
        this.registerUser(user);
      }
    }
  }
  
  registerUser(user: any) {
    this.usuariosService.register(user).subscribe(
      response => {
        if (response.status) {
          console.log('Registro exitoso: ', response.mensaje);
        } else {
          console.log('Registro fallido: ', response.mensaje);
        }
      },
      error => {
        console.log('Hubo un error en el registro: ', error);
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
  }
}
  
  
  
  
}
