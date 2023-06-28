import { Component,Inject, OnInit  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LlamadosModificarEstadosComponent } from '../llamados-modificar-estados/llamados-modificar-estados.component';
@Component({
  selector: 'app-llamados-administrar-estados',
  templateUrl: './llamados-administrar-estados.component.html',
  styleUrls: ['./llamados-administrar-estados.component.scss']
})
export class LlamadosAdministrarEstadosComponent {
    constructor(
      public dialogRef: MatDialogRef<LlamadosModificarEstadosComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog
    ) { }

    openModificarEstadoDialog(element: any): void {
      this.dialog.open(LlamadosModificarEstadosComponent, {
        width: '400px',
        data: {...element}
      });
    }
    
}
