import { Component } from '@angular/core';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent {
  username!: string;
  documento!: string;
  tipoDocumento!: string;
  imagen!: string;
  email!: string;
  roles!: string[];
  expiration!: string;

  constructor() { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    this.documento = localStorage.getItem('documento') || '';
    this.tipoDocumento = localStorage.getItem('tipoDocumento') || '';
    this.imagen = localStorage.getItem('imagen') || '';
    this.email = localStorage.getItem('email') || '';
    this.roles = JSON.parse(localStorage.getItem('roles') || '[]');
    this.expiration = localStorage.getItem('expiration') || '';
  }
}
