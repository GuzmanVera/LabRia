import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.scss']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // El operador "!" le indica a TypeScript que confíe en que esta variable será inicializada posteriormente.

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }


  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      // Aquí puedes añadir tu lógica para enviar los datos al servidor
    }
  }
}