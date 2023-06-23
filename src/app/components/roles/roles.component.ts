import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Roles } from 'src/app/models/roles';
import { RolesService } from 'src/app/services/roles/roles.service';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit{
  displayedColumns: string[] = ['id', 'nombre'];
  dataSource: Roles[] = [];  // inicializa el dataSource aquí
  totalCount: number = 0;
  pageEvent: PageEvent = {pageIndex: 0, pageSize: 10, length: 0};
  sortDirection: 'asc' | 'desc' = 'asc'; // Dirección de la ordenación
  sortField: string = ''; // Campo de ordenación


  onPaginateChange(event: PageEvent) {
    this.pageEvent = event;
    
    this.getRoles();
  }
  
  sortData(field: string) {
    // Si el campo es el mismo que el anterior, cambiamos la dirección de la ordenación
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Si es un nuevo campo, ordenamos ascendente por defecto
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  
    // Actualizamos la consulta a la API con el nuevo ordenamiento
    this.getRoles();
  }
  

  constructor(private rolesService: RolesService, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getRoles();
  }

  filterValue!: string;

 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.filterValue = filterValue;
  this.getRoles();
}



getRoles(): void {

  this.rolesService.getAll().subscribe(
    response => {
      this.dataSource = response;
    },
    error => {
      this.snackBar.open('Hubo un error al recuperar los roles', 'Cerrar', { duration: 5000 });
    }
  );
}

}
