import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Llamados } from 'src/app/models/llamados';

@Injectable({
  providedIn: 'root'
})
export class LlamadosService {
  private apiURL = 'http://localhost:5000/api/Llamados';

  constructor(private http: HttpClient) { }

  getAll(offset: number, limit: number, filterValue?: string, sort?: string): Observable<any> {
    const body = {
      limit: limit,
      offset: offset,
      id: 0,
      filters: { activo: null, nombre: filterValue || "", identificador: ""},
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
      nombre: llamados.nombre,
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

  
}
