import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importa el operador map
import { TipoDeDocumento } from '../models/tipo-de-documento';

@Injectable({
  providedIn: 'root'
})
export class TiposDeDocumentoService {
  private apiURL = 'http://localhost:5000/api/TiposDeDocumentos';

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
  

  get(id: number): Observable<TipoDeDocumento> {
    return this.http.get<TipoDeDocumento>(`${this.apiURL}/${id}`);
  }

  create(tipoDeDocumento: TipoDeDocumento): Observable<TipoDeDocumento> {
    const requestBody = {
      id: 0,
      activo: tipoDeDocumento.activo,
      nombre: tipoDeDocumento.nombre,
    };
    console.log(requestBody);
    return this.http.post<TipoDeDocumento>(this.apiURL, requestBody);
  }
  
  update(id: number, tipoDeDocumento: TipoDeDocumento): Observable<TipoDeDocumento> {
    const requestBody = {
      id: id,
      activo: tipoDeDocumento.activo,
      nombre: tipoDeDocumento.nombre,
    };
  
    return this.http.put<TipoDeDocumento>(`${this.apiURL}/${id}`, requestBody);
  }
  

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }
}