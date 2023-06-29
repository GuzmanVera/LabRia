
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { TiposDeIntegranteService } from 'src/app/services/tipos-de-integrante/tipos-de-integrante.service';
import { TipoDeIntegrante } from 'src/app/models/tipo-de-integrante';
import { MiembrosTribunalesService } from 'src/app/services/miembros-tribunales/miembros-tribunales.service';


@Component({
  selector: 'app-agregar-miembro-tribunal',
  templateUrl: './agregar-miembro-tribunal.component.html',
  styleUrls: ['./agregar-miembro-tribunal.component.scss']
})
export class AgregarMiembroTribunalComponent implements OnInit {
  form: FormGroup;
  usuarios: any[] = [];
  tiposDeIntegrantes: any[] = [];
  isEditing: boolean = false; // Para saber si estamos editando o no

  constructor(
    public dialogRef: MatDialogRef<AgregarMiembroTribunalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private usuariosService: UsuariosService,
    private snackBar: MatSnackBar,
    private tiposDeIntegranteService: TiposDeIntegranteService,
    private miembrosTribunalesService: MiembrosTribunalesService
  ) { 
    this.isEditing = this.data.isEditing || false; // Chequear si estamos en modo de edición
    // Inicializar los campos del formulario con los datos del miembro si estamos editando
    this.form = new FormGroup({
      usuario: new FormControl(this.isEditing ? this.data : null),
      tiposDeIntegrantes: new FormControl(this.isEditing ? this.data.tiposDeIntegrantes : null)
    });
  }
  
  ngOnInit(): void {
    this.tiposDeIntegranteService.getAll(0, -1).subscribe(
      response => {
        this.tiposDeIntegrantes = response.list;
      },
      error => {
        this.snackBar.open('Hubo un error al recuperar los tipos de integrante', 'Cerrar', { duration: 5000 });
      }
    );
  
    this.usuariosService.getAll(0, 1000, undefined, undefined, 'nombre').subscribe(
      response => {
        this.usuarios = response.list.filter((user: { roles: string | string[]; }) => user.roles.includes('TRIBUNAL'));
  
        // Inicializa el formulario aquí, después de que se hayan cargado los usuarios
        this.initForm();
      },
      error => {
        this.snackBar.open('Hubo un error al recuperar los usuarios', 'Cerrar', { duration: 5000 });
      }
    );
  }

 initForm(): void {
  let usuarioDefault = null;
  let tiposDeIntegrantesDefault = null;

  if (this.isEditing) {
    // Busca el usuario con el id `this.data.personaId`
    usuarioDefault = this.usuarios.find(u => u.persona.id === this.data.personaId);
    
    // Busca el objeto correspondiente en `tiposDeIntegrantes`
    tiposDeIntegrantesDefault = this.tiposDeIntegrantes.find(t => t.id === this.data.tipoDeIntegrante.id);
  }

  this.form = new FormGroup({
    usuario: new FormControl(usuarioDefault),
    tiposDeIntegrantes: new FormControl(tiposDeIntegrantesDefault)
  });
}

  
  

  onSubmit() {
    if (this.form.valid) {
      const { usuario, tiposDeIntegrantes } = this.form.value;
       
      if (this.isEditing) {        
        // Si estamos editando, actualizamos el miembro del tribunal
        this.miembrosTribunalesService.update(this.data.id, this.data.llamadoId, usuario.persona.id, tiposDeIntegrantes.id).subscribe(response => {
          // Aquí puedes manejar la respuesta del servicio
          this.dialogRef.close(usuario);
        }, error => {
          // Aquí puedes manejar el error del servicio
          console.error('Hubo un error al actualizar el miembro del tribunal', error);
        });
      } else {
        // Si no estamos editando, creamos un nuevo miembro del tribunal
        const llamadoId = this.data.llamadoEstados[0].llamadoId;  // Asumiendo que el llamado está en data
      
        this.miembrosTribunalesService.create( llamadoId, usuario.persona.id, tiposDeIntegrantes.id).subscribe(response => {
          // Aquí puedes manejar la respuesta del servicio
          this.dialogRef.close(usuario);
        }, error => {
          // Aquí puedes manejar el error del servicio
          console.error('Hubo un error al crear el miembro del tribunal', error);
        });
      }
    }
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }
  

  
}
