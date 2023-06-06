import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public errorMessage = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private router: Router) { }

  login(loginData: {username: string, password: string}) {
    return this.http.post<any>('http://localhost:5000/api/Auth/Login', loginData)
    .subscribe({
      next: (res) => {
        if (res.statusOk) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.nombre);
          localStorage.setItem('expiration', res.expiration);
          this.router.navigate(['/navbar']);
          this.errorMessage.next(''); // Limpiar el mensaje de error
        } else {
          // Inicio de sesión fallido
          this.errorMessage.next(res.statusMessage); // Emitir el mensaje de error
        }
      },
      error: (err) => {
        // Aquí puedes manejar otros errores que no son específicos de la autenticación.
        this.errorMessage.next(err.error.statusMessage);
      }
    });
    
  }
  
}
