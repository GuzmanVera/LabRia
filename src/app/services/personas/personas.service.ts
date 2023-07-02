import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'; // Importa el operador map
import { Personas } from '../../models/personas';
import { TiposDeDocumentoService } from '../tipos-de-documento/tipos-de-documento.service';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private apiURL = 'http://localhost:5000/api/Personas';

  constructor(private http: HttpClient, private tipoDeDocumentoService: TiposDeDocumentoService) { }

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

  getPorDocumento(tipoDocumento: number, documento: string){
    return this.http.get<Personas>(`${this.apiURL}/${tipoDocumento}/${documento}`);
  }
  

  get(id: number): Observable<Personas> {
    return this.http.get<Personas>(`${this.apiURL}/${id}`);
  }

  create(personas: Personas): Observable<Personas> {
    let requestBody: any;
    return this.tipoDeDocumentoService.get(personas.idTipoDeDocumento).pipe(
      switchMap(tipoDeDocumento => {
        requestBody = {
          id: 0,
          activo: personas.activo,
          tipoDeDocumento: tipoDeDocumento,
          documento: personas.documento,
          primerNombre: personas.primerNombre,
          segundoNombre: personas.segundoNombre,
          primerApellido: personas.primerApellido,
          segundoApellido: personas.segundoApellido,
        };
        return this.http.post<Personas>(this.apiURL, requestBody);
      })
    );
  }
  
  
  update(id: number, personas: Personas): Observable<Personas> {
    const requestBody = {
      id: id,
      activo: personas.activo,
      tipoDeDocumento: personas.tipoDeDocumento,
      documento: personas.documento,
      primerNombre: personas.primerNombre,
      segundoNombre: personas.segundoNombre,
      primerApellido: personas.primerApellido,
      segundoApellido: personas.segundoApellido,
    };
  
    return this.http.put<Personas>(`${this.apiURL}/${id}`, requestBody);
  }
  

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }
}