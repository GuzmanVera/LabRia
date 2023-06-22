import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importa el operador map
import { Roles } from '../../models/roles';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private apiURL = 'http://localhost:5000/api/Auth/Users';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {

    return this.http.get<any>(`${this.apiURL}/Roles`);
  }
  

  get(id: number): Observable<Roles> {
    return this.http.get<Roles>(`${this.apiURL}/${id}`);
  }
  
}