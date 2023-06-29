import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { PostulantesService } from 'src/app/services/postulantes/postulantes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosDialogComponent } from 'src/app/components/usuarios/usuarios-dialog/usuarios-dialog.component';

@Component({
  selector: 'app-agregar-postulante',
  templateUrl: './agregar-postulante.component.html',
  styleUrls: ['./agregar-postulante.component.scss']
})
export class AgregarPostulanteComponent implements OnInit {

  usuarios: any[] = [];
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AgregarPostulanteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private usuariosService: UsuariosService, 
    private fb: FormBuilder,
    private PostulantesService: PostulantesService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog  ) { 
    this.form = this.fb.group({
      usuario: new FormControl(null, Validators.required),
      documento: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
  }

  buscarUsuarioPorDocumento(): void {
    const documento = this.form.get('documento')?.value;
    if (documento) {
      this.usuariosService.getAll(0, 1000, documento, undefined, 'documento').subscribe(
        response => {
          this.usuarios = response.list.filter((user: { roles: string | string[]; }) => user.roles.includes('USER'));
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
        this.usuarios = response.list.filter((user: { roles: string | string[]; }) => user.roles.includes('USER'));
      },
      error => {
        this.snackBar.open('Hubo un error al recuperar los usuarios', 'Cerrar', { duration: 5000 });
      }
    );
  }

  
  onSubmit() {
    if (this.form.valid) {
      const { usuario } = this.form.value;
       
      if (usuario && usuario.persona) {
        const llamadoId = this.data.llamadoEstados[0].llamadoId;  
        
        this.PostulantesService.create(llamadoId, usuario.persona.id).subscribe(response => {
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
    const dialogRef = this.dialog.open(UsuariosDialogComponent, {
      width: '500px',
      data: {
        nombre: '',
        activo: false,
      } 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // "result" contiene los datos devueltos por el diálogo. En este caso, el tipo de documento a crear.
      if (result) {
        this.usuariosService.create(result).subscribe({
          next: (data) => {
            
            this.snackBar.open('Usuario creado con éxito', 'Cerrar', { duration: 5000 });
          },
          error: (error) => {
            this.snackBar.open('Hubo un error al crear el usuario', 'Cerrar', { duration: 5000 });
          }
        });
      }
    });
    this.getUsuarios()
  }
}
