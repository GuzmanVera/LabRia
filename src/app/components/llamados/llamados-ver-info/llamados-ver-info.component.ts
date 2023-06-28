import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-llamados-ver-info',
  templateUrl: './llamados-ver-info.component.html',
  styleUrls: ['./llamados-ver-info.component.scss']
})
export class LlamadosVerInfoComponent {

  constructor(
    public dialogRef: MatDialogRef<LlamadosVerInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  
}
