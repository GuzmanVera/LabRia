import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.scss']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // El operador "!" le indica a TypeScript que confíe en que esta variable será inicializada posteriormente.

  constructor(private http: HttpClient, private router: Router) {} // Inyectar HttpClient


  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }


  onSubmit() {
  if (this.loginForm.valid) {
    const loginData = this.loginForm.value;
    this.http.post<any>('http://localhost:5000/api/Auth/Login', loginData).subscribe(
      (res) => {
        console.log(res);
        if (res.statusOk) {
          // Inicio de sesión exitoso
          // Guardar el token y otros datos en algún lugar, por ejemplo, en el almacenamiento local
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.nombre);
          localStorage.setItem('expiration', res.expiration);


          // Aquí puedes redirigir al usuario a la página principal, por ejemplo
          this.router.navigate(['/navbar']);
        } else {
          // Inicio de sesión fallido
          // Mostrar el mensaje de error al usuario
          console.log(res.statusMessage);
        }
      },
      (err) => {
        console.log(err);
        // Aquí puedes manejar los errores
      }
    );
  }
}
}