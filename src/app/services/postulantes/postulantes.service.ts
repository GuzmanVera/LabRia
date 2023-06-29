import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importa el operador map
import { Roles } from '../../models/roles';


@Injectable({
  providedIn: 'root'
})
export class PostulantesService {
  private apiURL = 'http://localhost:5000/api/Postulantes';

  constructor(private http: HttpClient) { }

  create(llamadoId: number, personaId: string): Observable<any> {
    const requestBody = {
      id: 0,
      activo: true,
      fechaHoraEntrevista: null,
      estudioMeritosRealizado: false,
      entrevistaRealizada: false,
      llamadoId : llamadoId,
      personaId: personaId,
    };
    
    return this.http.post<any>(this.apiURL, requestBody);
  }

  update(id: number, requestBody: any): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/${id}`, requestBody);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }


  
  
}