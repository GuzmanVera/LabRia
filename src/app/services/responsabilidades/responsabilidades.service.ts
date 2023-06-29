import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Responsabilidades } from 'src/app/models/responsabilidades';
import { AreasService } from '../areas/areas.service';

@Injectable({
  providedIn: 'root'
})
export class ResponsabilidadesService {
  private apiURL = 'http://localhost:5000/api/Responsabilidades';

  constructor(private http: HttpClient, private areasService: AreasService) { }

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
  

  get(id: number): Observable<Responsabilidades> {
    return this.http.get<Responsabilidades>(`${this.apiURL}/${id}`);
  }

  create(responsabilidades: Responsabilidades): Observable<Responsabilidades> {
    const requestBody = {
      id: 0,
      activo: responsabilidades.activo,
      nombre: responsabilidades.nombre,
      descripcion: responsabilidades.descripcion,
      areaId: responsabilidades.idArea,
      area: this.areasService.get(responsabilidades.idArea)
    };
    console.log(requestBody);
    return this.http.post<Responsabilidades>(this.apiURL, requestBody);
  }
  
  update(id: number, responsabilidades: Responsabilidades): Observable<Responsabilidades> {
    const requestBody = {
      id: id,
      activo: responsabilidades.activo,
      nombre: responsabilidades.nombre,
      descripcion: responsabilidades.descripcion,
      areaId: responsabilidades.idArea,
      area: this.areasService.get(responsabilidades.idArea)
    };
  
    return this.http.put<Responsabilidades>(`${this.apiURL}/${id}`, requestBody);
  }
  

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }
}