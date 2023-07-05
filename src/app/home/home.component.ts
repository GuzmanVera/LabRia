import { Component } from '@angular/core';
import { LlamadosService } from '../services/llamados/llamados.service';
import { Llamados } from '../models/llamados';
import { TiposDeDocumentoService } from '../services/tipos-de-documento/tipos-de-documento.service';
import { PersonasService } from '../services/personas/personas.service';
import { filter, from, map, switchMap, toArray } from 'rxjs';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { startOfDay } from 'date-fns';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  username = localStorage.getItem('username');
  public isAdmin: boolean = false;
  public isTribunal: boolean = false;
  public isCoordinador: boolean = false;
  dataSource: any[] = [];  // inicializa el dataSource aquí
  usuarioLogueadoId!: number; // Definición de la nueva propiedad
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;
  selectedDay: any;
  displayedColumns: string[] = ['nombre', 'ultimoEstado'];


constructor(private llamadosService: LlamadosService, private tipoDeDocumentoService: TiposDeDocumentoService, private personasService: PersonasService ) {
  

}
ngOnInit(): void {
  this.getLlamados();
  
}

dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
  console.log('dayClicked');
  console.log(date);
  console.log(events);
  if (events.length > 0) {
    this.selectedDay = { date, events };
  } else {
    this.selectedDay = null;
  }
}

getLlamados(): void {
  const roles = localStorage.getItem('roles');
  const tipoDocumentoUser = localStorage.getItem('tipoDocumento');
  const documentoUser = localStorage.getItem('documento');
  
  
  


  if (roles) {
    const rolesArray = JSON.parse(roles);
    if (rolesArray.includes('ADMIN')) {
      this.isAdmin = true;
      this.isTribunal = false;
      this.llamadosService.getAll(0, -1).subscribe(
        response => {
          this.dataSource = response.list;
          this.createCalendarEvents(this.dataSource);
          console.log(this.dataSource);
        },
        error => {
          console.log('Hubo un error al recuperar los llamados:', error);
        }
      );
    } else if (rolesArray.includes('TRIBUNAL')) {
      this.isAdmin = false;
      this.isTribunal = true;
      this.tipoDeDocumentoService.getAll(0, -1, tipoDocumentoUser ?? '').subscribe(
        response => {
          if (response && response.list && response.list.length > 0) {
            const tipoDocumentoId = response.list[0].id;
            this.personasService.getPorDocumento(tipoDocumentoId, documentoUser ?? '').subscribe(
              response => {
                this.usuarioLogueadoId = response.id;
                this.llamadosService.getAll(0, 1, this.usuarioLogueadoId.toString()).pipe(
                  switchMap((response: { list: Llamados[] }) => from(response.list)),
                  switchMap((llamado: Llamados) => this.llamadosService.haRenunciado(llamado.id, this.usuarioLogueadoId).pipe(
                    map(haRenunciado => {
                      if (!haRenunciado) {
                        return llamado;
                      } else {
                        return null;
                      }
                    })
                  )),
                  filter(llamado => !!llamado),
                  toArray()
                ).subscribe(
                  response => {
                    this.dataSource = response.filter((llamado): llamado is Llamados => !!llamado);
                    this.createCalendarEvents(this.dataSource);

                    console.log(this.dataSource);
              
                  },
                  error => {
                    console.log('Hubo un error al recuperar los llamados:', error);
                  }
                );
              }
            );
          }
        },
        error => {
          console.log('Hubo un error al recuperar los tipos de documento:', error);
        }
      );
   
    }
    else if (rolesArray.includes('COORDINADOR')) {
      this.isAdmin = false;
      this.isTribunal = false;
      this.isCoordinador = true;
      this.llamadosService.getAll(0, -1).subscribe(
        response => {
          
          this.dataSource = response.list;
          this.createCalendarEvents(this.dataSource);
          console.log(this.dataSource);
          
        },
        error => {
          console.log('Hubo un error al recuperar los llamados:', error);
        }
      );
    
    }
  }
 
}

createCalendarEvents(dataSource: any[]) {
  console.log('createCalendarEvents');
  console.log(dataSource);
  dataSource.forEach(llamado => {
    llamado.postulantes.forEach((postulante: { fechaHoraEntrevista: string | number | Date; persona: { primerNombre: any; primerApellido: any; }; }) => {
      if (postulante.fechaHoraEntrevista) {
        this.events.push({
          start: new Date(postulante.fechaHoraEntrevista),
          title: `Entrevista con ${postulante.persona.primerNombre} ${postulante.persona.primerApellido} para el llamado ${llamado.nombre}`,
          allDay: true,
          meta: {
            postulante,
            llamado
          }
        });
      }
    });
  });
  console.log(this.events); // Aquí verificamos los eventos creados
  this.events = [...this.events];

}


}
