import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuarios } from 'src/app/models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiURL = 'http://localhost:5000/api/Auth';

  constructor(private http: HttpClient) { }

  getAll(offset: number, limit: number, filterValue?: string, sort?: string, field?: string): Observable<any> {
    const body = {
      limit: limit,
      offset: offset,
      id: 0,
      filters: { [field || '']: filterValue || "" },
      orders: sort ? [sort] : [""]
    };
  
    return this.http.post<any>(`${this.apiURL}/Users`, body);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiURL}/Register`, user);
  }

  

  get(id: number): Observable<Usuarios> {
    return this.http.get<Usuarios>(`${this.apiURL}/${id}`);
  }

  create(usuarios: Usuarios): Observable<Usuarios> {
    const requestBody = {
      id: 0,
      username: usuarios.username,
      email: usuarios.email,
      persona: usuarios.persona,
      activo: usuarios.activo,
      imagen: usuarios.imagen,
    };
    console.log(requestBody);
    return this.http.post<Usuarios>(`${this.apiURL}/Register`, requestBody);
  }
  
  update(user: any): Observable<any> {
    return this.http.put(`${this.apiURL}/Users`, user);
  }
  

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }

  addRole(id: number, rol: string): Observable<any>{
    const requestBody = {
      userId: id,
      roleId: rol,
    };
    return this.http.post(`${this.apiURL}/UserRoles`, requestBody);
  }
}
