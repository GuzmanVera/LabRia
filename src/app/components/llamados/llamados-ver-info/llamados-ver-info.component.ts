import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LlamadosDialogComponent } from '../llamados-dialog/llamados-dialog.component';
import { LlamadosDeleteDialogComponent } from '../llamados-delete-dialog/llamados-delete-dialog.component';
import { ResponsabilidadesService } from 'src/app/services/responsabilidades/responsabilidades.service';


@Component({
  selector: 'app-llamados-ver-info',
  templateUrl: './llamados-ver-info.component.html',
  styleUrls: ['./llamados-ver-info.component.scss']
})
export class LlamadosVerInfoComponent {
  responsabilidades: any;

  ngOnInit(): void {
    this.getResponsabilidades();
  }

  
  constructor(
    public dialogRef: MatDialogRef<LlamadosVerInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private responsabilidadesService: ResponsabilidadesService,
  ) { }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(LlamadosDialogComponent, {
      width: '500px',
      data: this.data
    });
  }

  openDeleteDialog():void{
    const dialogRef = this.dialog.open(LlamadosDeleteDialogComponent, {
      width: '500px',
      data: this.data
    });
  }

  getResponsabilidades(): void {
  this.responsabilidadesService.getAll(0,-1).subscribe(
    response => {
      console.log("areaa", this.data.areaId);
      if(response != null){
        this.responsabilidades = response.list.filter((responsabilidad: { area: { id: any; }; }) => responsabilidad.area.id === this.data.areaId);
      }
    }
  )
}

  
}
