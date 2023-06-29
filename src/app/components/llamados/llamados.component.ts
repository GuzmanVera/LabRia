import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Llamados } from 'src/app/models/llamados';
import { LlamadosService } from 'src/app/services/llamados/llamados.service';
import { LlamadosDialogComponent } from './llamados-dialog/llamados-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LlamadosDeleteDialogComponent } from './llamados-delete-dialog/llamados-delete-dialog.component';
import { LlamadosVerInfoComponent } from './llamados-ver-info/llamados-ver-info.component';
import { LlamadosAdministrarEstadosComponent } from './llamados-administrar-estados/llamados-administrar-estados.component';
import { LlamadosTribunalComponent } from './llamados-tribunal/llamados-tribunal.component';

@Component({
  selector: 'app-llamados',
  templateUrl: './llamados.component.html',
  styleUrls: ['./llamados.component.scss']
})
export class LlamadosComponent implements OnInit {
  displayedColumns: string[] = ['identificador', 'nombre', 'area', 'estado','acciones'];
  dataSource: Llamados[] = [];  // inicializa el dataSource aquí
  totalCount: number = 0;
  pageEvent: PageEvent = {pageIndex: 0, pageSize: 10, length: 0};
  sortDirection: 'asc' | 'desc' = 'asc'; // Dirección de la ordenación
  sortField: string = ''; // Campo de ordenación


  onPaginateChange(event: PageEvent) {
    this.pageEvent = event;
    
    this.getLlamados();
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
    this.getLlamados();
  }
  

  constructor(private llamadosService: LlamadosService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getLlamados();
  }

  filterValue!: string;

 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.filterValue = filterValue;
  this.getLlamados();
}



getLlamados(): void {
  const pageIndex = this.pageEvent ? this.pageEvent.pageIndex : 0;
  const pageSize = this.pageEvent ? this.pageEvent.pageSize : 10;
  const offset = pageIndex * pageSize;
  const sort = this.sortField ? `${this.sortField} ${this.sortDirection}` : '';
  
  this.llamadosService.getAll(offset, pageSize, this.filterValue, sort).subscribe(
    response => {
      this.dataSource = response.list;
      this.totalCount = response.totalCount;
    },
    error => {
      console.log('Hubo un error al recuperar los tipos de documento:', error);
    }
  );
}

openCreateDialog(): void {
  const dialogRef = this.dialog.open(LlamadosDialogComponent, {
    width: '300px',
    data: {
      id: null,
      nombre: '',
      identificador: '',
      linkPlanillaPuntajes: '',
      linkActa: '',
      minutosEntrevista: null,
      area: null,
      activo: false,
      // agregar el resto de las propiedades de Llamados aquí si las hay
    } 
  });

  dialogRef.afterClosed().subscribe(result => {
    // "result" contiene los datos devueltos por el diálogo. En este caso, el tipo de documento a crear.
    this.getLlamados()
  });
  
}
  
  openEditDialog(Llamados: Llamados): void {
    const dialogRef = this.dialog.open(LlamadosDialogComponent, {
      width: '250px',
      data: {...Llamados}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.llamadosService.update(result.id, result).subscribe(
          data => {
            this.getLlamados();
          },
          error => {
            console.log('Hubo un error al actualizar el tipo de documento:', error);
          }
        );
      }
    });
  }

  openDeleteDialog(Llamados: Llamados): void {
    const dialogRef = this.dialog.open(LlamadosDeleteDialogComponent, {
      width: '250px',
      data: {...Llamados}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.llamadosService.delete(result).subscribe(
          data => {
            this.getLlamados();
          },
          error => {
            console.log('Hubo un error al eliminar el tipo de documento:', error);
          }
        );
      }
    });
  }


  openViewInfoDialog(element: any): void {
    this.dialog.open(LlamadosVerInfoComponent, {
      width: '500px',
      data: {...element}
    });
  }

  openAdminEstadosDialog(element: any): void {
   const dialogRef = this.dialog.open(LlamadosAdministrarEstadosComponent, {
      width: '610px',
      data: {...element}
    });
    dialogRef.afterClosed().subscribe(result => {
      
      this.getLlamados()
    });
  }

  
  openAdminTribunalDialog(element: any): void {
    const dialogRef = this.dialog.open(LlamadosTribunalComponent, {
       width: '500px',
       data: {...element}
     });
     dialogRef.afterClosed().subscribe(result => {
       
       this.getLlamados()
     });
   }
}