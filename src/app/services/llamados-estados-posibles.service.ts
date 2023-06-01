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

  getAll(): Observable<LlamadosEstadosPosibles[]> {
    const body = {
      limit: 5,
      offset: 0,
      id: 0,
      filters: { activo: true, nombre: "" },
      orders: [""]
    };
    
    return this.http.post<any>(`${this.apiURL}/Paged`, body).pipe(
      map(response => response.list)
    );
  }

  get(id: number): Observable<LlamadosEstadosPosibles> {
    return this.http.get<LlamadosEstadosPosibles>(`${this.apiURL}/${id}`);
  }

  create(llamadoEstadosPosibles: LlamadosEstadosPosibles): Observable<LlamadosEstadosPosibles> {
    const requestBody = {
      id: 0,
      activo: true,
      nombre: llamadoEstadosPosibles.nombre,
    };
  
    return this.http.post<LlamadosEstadosPosibles>(this.apiURL, requestBody);
  }
  
  update(id: number, llamadoEstadosPosibles: LlamadosEstadosPosibles): Observable<LlamadosEstadosPosibles> {
    const requestBody = {
      id: id,
      activo: true,
      nombre: llamadoEstadosPosibles.nombre,
    };
  
    return this.http.put<LlamadosEstadosPosibles>(`${this.apiURL}/${id}`, requestBody);
  }
  

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }
}
