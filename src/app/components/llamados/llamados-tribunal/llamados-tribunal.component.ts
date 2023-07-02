
import { Component, Inject, OnInit  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LlamadosEstadosPosiblesService } from 'src/app/services/llamados-estados-posibles/llamados-estados-posibles.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl } from '@angular/forms';
import { LlamadosService} from 'src/app/services/llamados/llamados.service';
import { AgregarMiembroTribunalComponent} from './agregar-miembro-tribunal/agregar-miembro-tribunal.component';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { LlamadosDeleteDialogComponent } from '../llamados-delete-dialog/llamados-delete-dialog.component';

@Component({
  selector: 'app-llamados-tribunal',
  templateUrl: './llamados-tribunal.component.html',
  styleUrls: ['./llamados-tribunal.component.scss']
})



export class LlamadosTribunalComponent implements  OnInit {
  form: FormGroup;
  usuarios: Usuarios[] = []; 


  constructor(
    public dialogRef: MatDialogRef<LlamadosTribunalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public isAdmin: any, 
    private llamadosEstadosPosiblesService: LlamadosEstadosPosiblesService, 
    private llamadosService: LlamadosService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private usuariosService: UsuariosService
  ) { 
    this.form = new FormGroup({
      idEstado: new FormControl(null),
      observaciones: new FormControl('') // Aquí se añade el nuevo FormControl
    });
  }

  openModificarMiembroDialog(miembro: any): void {
    this.dialog.open(AgregarMiembroTribunalComponent, {
      width: '400px',
      data: {...miembro, isEditing: true} // Agregar una propiedad isEditing para saber que estamos editando
    });
  }




  openAgregarMiembroDialog(element: any): void {
    this.dialog.open(AgregarMiembroTribunalComponent, {
      width: '400px',
      data: {...element}
    });
  }

  ngOnInit(): void {
    
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
          //this.snackBar.open('Hubo un error al modificar el estado', 'Cerrar', { duration: 5000 });
        });
    }
  }

  openRenunciarDialog(element: any, miembro: any): void {
    this.dialog.open(LlamadosDeleteDialogComponent, {
      width: '600px',
      data: {
        llamado: element,
        miembro: miembro
      }
    });
  }
  
}
