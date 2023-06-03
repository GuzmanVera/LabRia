import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importa el operador map
import { Areas } from '../models/areas';



@Injectable({
  providedIn: 'root'
})
export class AreasService {
  private apiURL = 'http://localhost:5000/api/Areas';

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

  get(id: number): Observable<Areas> {
    return this.http.get<Areas>(`${this.apiURL}/${id}`);
  }

  create(areas: Areas): Observable<Areas> {
    const requestBody = {
      id: 0,
      activo: areas.activo,
      nombre: areas.nombre,
    };
    console.log(requestBody);
    return this.http.post<Areas>(this.apiURL, requestBody);
  }

  update(id: number, areas: Areas): Observable<Areas> {
    const requestBody = {
      id: id,
      activo: areas.activo,
      nombre: areas.nombre,
    };
  
    return this.http.put<Areas>(`${this.apiURL}/${id}`, requestBody);
  }
  

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }
}
