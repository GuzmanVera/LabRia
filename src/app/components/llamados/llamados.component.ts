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
import { LlamadosPostulantesComponent } from './llamados-postulantes/llamados-postulantes.component';
import { PersonasService } from 'src/app/services/personas/personas.service';
import { TiposDeDocumentoService } from 'src/app/services/tipos-de-documento/tipos-de-documento.service';
import { switchMap, filter, toArray, map } from 'rxjs/operators';
import { from } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-llamados',
  templateUrl: './llamados.component.html',
  styleUrls: ['./llamados.component.scss'],
})
export class LlamadosComponent implements OnInit {
  displayedColumns: string[] = [
    'identificador',
    'nombre',
    'area',
    'estado',
    'acciones',
  ];
  dataSource: Llamados[] = []; // inicializa el dataSource aquí
  totalCount: number = 0;
  pageEvent: PageEvent = { pageIndex: 0, pageSize: 10, length: 0 };
  sortDirection: 'asc' | 'desc' = 'asc'; // Dirección de la ordenación
  sortField: string = ''; // Campo de ordenación
  usuarioLogueadoId!: number; // Definición de la nueva propiedad

  public isAdmin: boolean = false;
  public isTribunal: boolean = false;
  public isCoordinador: boolean = false;

  selectedField: string = ''; // Campo inicial para el filtro.
  fieldsToFilter = [
    //{value: 'nombre', viewValue: 'Nombre'},
    { value: 'identificador', viewValue: 'Identificador' },
    { value: 'nombre', viewValue: 'Nombre' },
    { value: 'estadoId', viewValue: 'Estado' },
    //{value: 'activo', viewValue: 'Activo'}
  ];

  onPaginateChange(event: PageEvent) {
    this.pageEvent = event;

    this.getLlamados(this.selectedField);
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
    this.getLlamados(this.selectedField);
  }

  constructor(
    private llamadosService: LlamadosService,
    public dialog: MatDialog,
    private personasService: PersonasService,
    private tipoDeDocumentoService: TiposDeDocumentoService
  ) {}

  ngOnInit(): void {
    this.getLlamados(this.selectedField);
  }

  filterValue!: string;

  applyFilter(event: Event | MatSelectChange) {
    const stateMap = {
      'TODOS': '0',
      'Iniciado': '1',
      'Estudio de Méritos Realizado': '2',
      'Entrevistas Realizadas': '3',
      'Psicotécnicos Realizados': '4',
      'Finalizado': '5'
    };
  
    if (event instanceof MatSelectChange) {
      // Esto es un MatSelectChange
      if (typeof event.value === 'string' && event.value in stateMap) {
        this.filterValue = stateMap[event.value as keyof typeof stateMap];
      }
    } else {
      // Esto es un Event
      this.filterValue = (event.target as HTMLInputElement).value;
    }
  
    this.getLlamados(this.selectedField);
  }
  
  

  getLlamados(field: string): void {
    const pageIndex = this.pageEvent ? this.pageEvent.pageIndex : 0;
    const pageSize = this.pageEvent ? this.pageEvent.pageSize : 10;
    const offset = pageIndex * pageSize;
    const sort = this.sortField
      ? `${this.sortField} ${this.sortDirection}`
      : '';

    const roles = localStorage.getItem('roles');
    const tipoDocumentoUser = localStorage.getItem('tipoDocumento');
    const documentoUser = localStorage.getItem('documento');

    if (roles) {
      const rolesArray = JSON.parse(roles);
      if (rolesArray.includes('ADMIN')) {
        this.isAdmin = true;
        this.isTribunal = false;
        this.llamadosService
          .getAll(offset, pageSize, this.filterValue, sort, this.selectedField)
          .subscribe(
            (response) => {
              this.dataSource = response.list;
              console.log(this.dataSource);
              this.totalCount = response.totalCount;
            },
            (error) => {
              console.log('Hubo un error al recuperar los llamados:', error);
            }
          );
      } else if (rolesArray.includes('TRIBUNAL')) {
        this.isAdmin = false;
        this.isTribunal = true;
        this.tipoDeDocumentoService
          .getAll(offset, pageSize, tipoDocumentoUser ?? '')
          .subscribe(
            (response) => {
              if (response && response.list && response.list.length > 0) {
                const tipoDocumentoId = response.list[0].id;
                this.personasService
                  .getPorDocumento(tipoDocumentoId, documentoUser ?? '')
                  .subscribe((response) => {
                    this.usuarioLogueadoId = response.id;
                    this.llamadosService
                      .getAll(
                        offset,
                        pageSize,
                        this.usuarioLogueadoId.toString(),
                        sort
                      )
                      .pipe(
                        switchMap((response: { list: Llamados[] }) =>
                          from(response.list)
                        ),
                        switchMap((llamado: Llamados) =>
                          this.llamadosService
                            .haRenunciado(llamado.id, this.usuarioLogueadoId)
                            .pipe(
                              map((haRenunciado) => {
                                if (!haRenunciado) {
                                  return llamado;
                                } else {
                                  return null;
                                }
                              })
                            )
                        ),
                        filter((llamado) => !!llamado),
                        toArray()
                      )
                      .subscribe(
                        (response) => {
                          this.dataSource = response.filter(
                            (llamado): llamado is Llamados => !!llamado
                          );
                          console.log(this.dataSource);
                          this.totalCount = this.dataSource.length; // <--- And here
                        },
                        (error) => {
                          console.log(
                            'Hubo un error al recuperar los llamados:',
                            error
                          );
                        }
                      );
                  });
              }
            },
            (error) => {
              console.log(
                'Hubo un error al recuperar los tipos de documento:',
                error
              );
            }
          );
      } else if (rolesArray.includes('COORDINADOR')) {
        this.isAdmin = false;
        this.isTribunal = false;
        this.isCoordinador = true;
        this.llamadosService
          .getAll(offset, pageSize, this.filterValue, sort, this.selectedField)
          .subscribe(
            (response) => {
              this.dataSource = response.list;
              console.log(this.dataSource);
              this.totalCount = response.totalCount;
            },
            (error) => {
              console.log('Hubo un error al recuperar los llamados:', error);
            }
          );
      }
    }
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
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // "result" contiene los datos devueltos por el diálogo. En este caso, el tipo de documento a crear.
      this.getLlamados(this.selectedField);
    });
  }

  openEditDialog(Llamados: Llamados): void {
    const dialogRef = this.dialog.open(LlamadosDialogComponent, {
      width: '250px',
      data: { ...Llamados },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.llamadosService.update(result.id, result).subscribe(
          (data) => {
            this.getLlamados(this.selectedField);
          },
          (error) => {
            console.log(
              'Hubo un error al actualizar el tipo de documento:',
              error
            );
          }
        );
      }
    });
  }

  openDeleteDialog(Llamados: Llamados): void {
    const dialogRef = this.dialog.open(LlamadosDeleteDialogComponent, {
      width: '250px',
      data: { ...Llamados },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.llamadosService.delete(result).subscribe(
          (data) => {
            this.getLlamados(this.selectedField);
          },
          (error) => {
            console.log(
              'Hubo un error al eliminar el tipo de documento:',
              error
            );
          }
        );
      }
    });
  }

  openViewInfoDialog(element: any): void {
    console.log(element);
    const dialogRef = this.dialog.open(LlamadosVerInfoComponent, {
      width: '500px',
      data: { ...element, isAdmin: this.isAdmin },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getLlamados(this.selectedField);
    });
  }

  openAdminEstadosDialog(element: any): void {
    const dialogRef = this.dialog.open(LlamadosAdministrarEstadosComponent, {
      width: '630px',
      data: {
        ...element,
        isAdmin: this.isAdmin,
        isTribunal: this.isTribunal,
        isCoordinador: this.isCoordinador,
        estudiosMeritosCompletos: element.postulantes.every(
          (p: { estudioMeritosRealizado: any }) => p.estudioMeritosRealizado
        ),
        entrevistasCompletas: element.postulantes.every(
          (p: { entrevistaRealizada: any }) => p.entrevistaRealizada
        ),
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getLlamados(this.selectedField);
    });
  }

  openAdminTribunalDialog(element: any): void {
    const dialogRef = this.dialog.open(LlamadosTribunalComponent, {
      width: '550px',
      data: { ...element, isTribunal: this.isAdmin },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getLlamados(this.selectedField);
    });
  }

  openPostulantesDialog(element: any): void {
    this.dialog.open(LlamadosPostulantesComponent, {
      width: '600px',
      data: { ...element, isAdmin: this.isAdmin, isTribunal: this.isTribunal },
    });
  }
}
