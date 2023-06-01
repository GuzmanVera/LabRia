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

  getAll(): Observable<Areas[]> {
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

  create(areas: Areas): Observable<Areas> {
    const requestBody = {
      id: 0,
      activo: true,
      nombre: areas.nombre,
    };
  
    return this.http.post<Areas>(this.apiURL, requestBody);
  }

  update(id: number, areas: Areas): Observable<Areas> {
    const requestBody = {
      id: id,
      activo: true,
      nombre: areas.nombre,
    };
  
    return this.http.put<Areas>(`${this.apiURL}/${id}`, requestBody);
  }
  

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }
}
