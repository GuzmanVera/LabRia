import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Llamados } from 'src/app/models/llamados';

@Injectable({
  providedIn: 'root'
})
export class LlamadosService {
  private apiURL = 'http://localhost:5000/api/Llamados';

  constructor(private http: HttpClient) { }

  getAll(offset: number, limit: number, filterValue?: string, sort?: string, field?: string): Observable<any> {
    const body = {
      limit: limit,
      offset: offset,
      id: 0,
      filters: { 
        [field || '']: filterValue || "", 
        identificador: field === 'identificador' ? filterValue : '' 
      },
      orders: sort ? [sort] : [""]
    };
  
    return this.http.post<any>(`${this.apiURL}/Paged`, body);
  }
  
  

  get(id: number): Observable<Llamados> {
    return this.http.get<Llamados>(`${this.apiURL}/${id}`);
  }

  create(llamados: Llamados): Observable<Llamados> {
    const requestBody = {
      id: 0,
      activo: llamados.activo,
      identificador: llamados.identificador,
      nombre: llamados.nombre,
      linkPlanillaPuntajes: llamados.linkPlanillaPuntajes,
      linkActa: llamados.linkActa,
      minutosEntrevista: llamados.minutosEntrevista,
      areaId: llamados.idArea,
      area: null,
      postulantes: [],
      miembrosTribunal: [],
      llamadosEstados: [],
      ultimoEstado: null

    };
    console.log('llamadosService:',requestBody);
    return this.http.post<Llamados>(this.apiURL, requestBody);
  }
  
  update(id: number, llamados: Llamados): Observable<Llamados> {
    const requestBody = {
      id: id,
      activo: llamados.activo,
      identificador: llamados.identificador,
      nombre: llamados.nombre,
      linkPlanillaPuntajes: llamados.linkPlanillaPuntajes,
      linkActa: llamados.linkActa,
      minutosEntrevista: llamados.minutosEntrevista,
      areaId: llamados.idArea,
      area: null,
      postulantes: [],
      miembrosTribunal: [],
      llamadosEstados: [],
      ultimoEstado: null
    };
  
    return this.http.put<Llamados>(`${this.apiURL}/${id}`, requestBody);
  }
  

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }

  modificarEstado(user: string, obs: string, llamadoId: number, llamadoEstadoPosibleId: number ): Observable<any> {
    const body = {
      id: 0,
      activo: true,
      fechaHora: "2023-06-28T15:34:46.838Z" ,
      usuarioTransicion: user,
      observacion: obs,
      llamadoId: llamadoId,
      llamadoEstadoPosibleId: llamadoEstadoPosibleId,
      llamadoEstadoPosible: null
    };
  
    return this.http.post<any>(`http://localhost:5000/api/LlamadosEstados`, body);
  }

  haRenunciado(llamadoId: number, usuarioId: number): Observable<boolean> {
    // Primero obtenemos el llamado
    return this.get(llamadoId).pipe(
      // Luego mapeamos el llamado a un booleano que indica si el usuario ha renunciado
      map(llamado => {
        // Encontramos el miembro del tribunal correspondiente al usuario
        const miembro = llamado.miembrosTribunal.find((miembro: { personaId: number; }) => miembro.personaId === usuarioId);
        
        // Si no encontramos al miembro, asumimos que no ha renunciado
        if (!miembro) {
          return true;
        }
 
        // Si encontramos al miembro, retornamos su valor de renuncia
        return false;

      })
    );
  }
  
}
