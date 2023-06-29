import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importa el operador map
import { Roles } from '../../models/roles';


@Injectable({
  providedIn: 'root'
})
export class MiembrosTribunalesService {
  private apiURL = 'http://localhost:5000/api/MiembrosTribunales';

  constructor(private http: HttpClient) { }

  create(llamadoId: number, personaId: string, tipoIntegranteId: number): Observable<any> {
    const requestBody = {
      id: 0,
      activo: true,
      renuncia: false,
      motivoRenuncia: "",
      llamadoId: llamadoId,
      personaId: personaId,
      tipoDeIntegranteId: tipoIntegranteId
    };
    
    return this.http.post<any>(this.apiURL, requestBody);
  }

  update(id: number, llamadoId: number, personaId: string, tipoIntegranteId: number): Observable<any> {
    const requestBody = {
      id: id,
      activo: true,
      renuncia: false,
      motivoRenuncia: "",
      llamadoId: llamadoId,
      personaId: personaId,
      tipoDeIntegranteId: tipoIntegranteId
    };
    
    return this.http.put<any>(`${this.apiURL}/${id}`, requestBody);
  }
  
  
}