import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');

    if (token && expiration && new Date(expiration) > new Date()) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });

      return next.handle(cloned);
    } else {
      // Si el token ha expirado, limpia el almacenamiento local y redirige al usuario a la página de inicio de sesión.
      if (token && expiration && new Date(expiration) <= new Date()) {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        this.router.navigate(['/login']);
      }
      return next.handle(req);
    }
  }
}
