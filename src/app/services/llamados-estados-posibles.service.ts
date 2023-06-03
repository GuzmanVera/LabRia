import { Injectable } from '@angular/core';
import { LlamadosEstadosPosibles } from '../models/llamados-estados-posibles';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LlamadosEstadosPosiblesService {

  private apiURL = 'http://localhost:5000/api/LlamadosEstadosPosibles';

  constructor(private http: HttpClient) { }

  getAll(offset: number, limit: number, filterValue?: string, sort?: string): Observable<any> {
    const body = {
      limit: limit,
      offset: offset,
      id: 0,
      filters: { activo: null, nombre: filterValue || "" },
      orders: sort ? [sort] : [""]
    };
  
    return this.http.post<any>(`${this.apiURL}/Paged`, body);
  }

  get(id: number): Observable<LlamadosEstadosPosibles> {
    return this.http.get<LlamadosEstadosPosibles>(`${this.apiURL}/${id}`);
  }

  create(llamadoEstadosPosibles: LlamadosEstadosPosibles): Observable<LlamadosEstadosPosibles> {
    const requestBody = {
      id: 0,
      activo: llamadoEstadosPosibles.activo,
      nombre: llamadoEstadosPosibles.nombre,
    };
  
    return this.http.post<LlamadosEstadosPosibles>(this.apiURL, requestBody);
  }
  
  update(id: number, llamadoEstadosPosibles: LlamadosEstadosPosibles): Observable<LlamadosEstadosPosibles> {
    const requestBody = {
      id: id,
      activo: llamadoEstadosPosibles.activo,
      nombre: llamadoEstadosPosibles.nombre,
    };
  
    return this.http.put<LlamadosEstadosPosibles>(`${this.apiURL}/${id}`, requestBody);
  }
  

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }
}
