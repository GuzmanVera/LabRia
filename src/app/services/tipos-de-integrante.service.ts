import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TipoDeIntegrante } from '../models/tipo-de-integrante';

@Injectable({
  providedIn: 'root'
})
export class TiposDeIntegranteService {

  private apiURL = 'http://localhost:5000/api/TiposDeIntegrantes';

  constructor(private http: HttpClient) { }

  getAll(): Observable<TipoDeIntegrante[]> {
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

  get(id: number): Observable<TipoDeIntegrante> {
    return this.http.get<TipoDeIntegrante>(`${this.apiURL}/${id}`);
  }

  create(tipoDeIntegrante: TipoDeIntegrante): Observable<TipoDeIntegrante> {
    const requestBody = {
      id: 0,
      activo: true,
      nombre: tipoDeIntegrante.nombre,
      orden: tipoDeIntegrante.orden
    };
  
    return this.http.post<TipoDeIntegrante>(this.apiURL, requestBody);
  }
  
  update(id: number, tipoDeIntegrante: TipoDeIntegrante): Observable<TipoDeIntegrante> {
    const requestBody = {
      id: id,
      activo: true,
      nombre: tipoDeIntegrante.nombre,
      orden: tipoDeIntegrante.orden
    };
  
    return this.http.put<TipoDeIntegrante>(`${this.apiURL}/${id}`, requestBody);
  }
  

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }
}
