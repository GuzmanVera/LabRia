import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public errorMessage = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private router: Router,  private snackBar: MatSnackBar) { }

  login(loginData: {username: string, password: string}) {
    return this.http.post<any>('http://localhost:5000/api/Auth/Login', loginData)
    .subscribe({
      next: (res) => {
        if (res.statusOk) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.nombre);
          localStorage.setItem('expiration', res.expiration);
          localStorage.setItem('documento', res.documento);
          localStorage.setItem('tipoDocumento', res.tipoDocumento.nombre);
          localStorage.setItem('imagen', res.imagen);
          localStorage.setItem('email', res.email);
          localStorage.setItem('roles', JSON.stringify(res.roles)); // Los roles son un array, por lo que los convertimos a un string JSON
          this.router.navigate(['/navbar']);
          this.setUserRoles(res.roles);
          this.errorMessage.next(''); // Limpiar el mensaje de error
          this.snackBar.open(`Bienvenido! ${res.nombre}`, 'Cerrar', { duration: 5000 });
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
  
  isLoggedIn(): boolean {
    const expiration = localStorage.getItem('expiration');
    if (expiration) {
      const expirationDate = new Date(expiration);
      return expirationDate > new Date();
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  restorePassword(email: string, token: string, password: string, confirmPassword: string) {
    const data = { email, token, password, confirmPassword };
    return this.http.post('http://localhost:5000/api/Auth/ResetPassword', data);
  }

  private userRoles: string[] = []; // Ahora es un array para manejar múltiples roles

  setUserRoles(roles: string[]) {
    this.userRoles = roles;
  }

  getUserRoles(): string[] {
    return this.userRoles;
  }

}


