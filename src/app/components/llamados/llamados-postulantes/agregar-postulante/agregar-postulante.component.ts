import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { PostulantesService } from 'src/app/services/postulantes/postulantes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosDialogComponent } from 'src/app/components/usuarios/usuarios-dialog/usuarios-dialog.component';
import { PersonasDialogComponent } from 'src/app/components/personas/personas-dialog/personas-dialog.component';
import { PersonasService } from 'src/app/services/personas/personas.service';
import { TiposDeDocumentoService } from 'src/app/services/tipos-de-documento/tipos-de-documento.service';

@Component({
  selector: 'app-agregar-postulante',
  templateUrl: './agregar-postulante.component.html',
  styleUrls: ['./agregar-postulante.component.scss']
})
export class AgregarPostulanteComponent implements OnInit {

  usuarios: any;
  tiposDocumento: any;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AgregarPostulanteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private usuariosService: UsuariosService, 
    private personasService: PersonasService,
    private fb: FormBuilder,
    private PostulantesService: PostulantesService,
    private snackBar: MatSnackBar,
    private tipoDeDocumentoService: TiposDeDocumentoService,
    public dialog: MatDialog  ) { 
    this.form = this.fb.group({
      usuario: new FormControl(null, Validators.required),
      documento: new FormControl(null, Validators.required),
      tipoDocumento: new FormControl(null, Validators.required),
    });
  }
  
  ngOnInit(): void {
    this.getTipoDocumento();
  }

  buscarUsuarioPorDocumento(): void {
    this.usuarios = [];
    const documento = this.form.get('documento')?.value;
    if (documento) {
      this.personasService.getPorDocumento(this.form.get('tipoDocumento')?.value,documento).subscribe(
        response => {
          // Agrega el usuario encontrado a la lista de usuarios
          if(response != null){
            this.usuarios.push(response);
          }
         
        },
        error => {
          this.snackBar.open('Hubo un error al buscar el usuario', 'Cerrar', { duration: 5000 });
        }
      );
    }
  }
  

  getUsuarios(): void {
    this.usuariosService.getAll(0, 1000, undefined, undefined, 'nombre').subscribe(
      response => {
        if (response != null){
          this.usuarios = response.list.filter((user: { roles: string | string[]; }) => user.roles.includes('USER'));
        }
      },
      error => {
        this.snackBar.open('Hubo un error al recuperar los usuarios', 'Cerrar', { duration: 5000 });
      }
    );
  }

  getTipoDocumento(): void {
    this.tipoDeDocumentoService.getAll(0,-1).subscribe(
      response => {
        this.tiposDocumento = response.list;
      },
      error => {
        this.snackBar.open('Hubo un error al recuperar los tipos de documento', 'Cerrar', {duration: 5000});
      }
    )
  }

  
  onSubmit() {
    if (this.form.valid) {
      const { usuario } = this.form.value;
      if (usuario) {

        const llamadoId = this.data.llamadoEstados[0].llamadoId;  
        
        this.PostulantesService.create(llamadoId, usuario.id).subscribe(response => {
          // Aquí puedes manejar la respuesta del servicio
          this.dialogRef.close(usuario);
        }, error => {
          // Aquí puedes manejar el error del servicio
          console.error('Hubo un error al crear el postulante', error);
        });
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(PersonasDialogComponent, {
      width: '500px',
      data: {
        nombre: '',
        activo: false,
      } 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // "result" contiene los datos devueltos por el diálogo. En este caso, el tipo de documento a crear.
      
    });
    this.getUsuarios()
  }
}
