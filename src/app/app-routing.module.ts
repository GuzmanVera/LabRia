import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiposDeDocumentoComponent } from './components/tipos-de-documento/tipos-de-documento.component';
import { AreasComponent } from './components/areas/areas.component';
import { TipoDeIntegranteComponent } from './components/tipo-de-integrante/tipo-de-integrante.component';
import { LlamadosEstadosPosiblesComponent } from './components/llamados-estados-posibles/llamados-estados-posibles.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MiPerfilComponent } from './components/perfil/mi-perfil/mi-perfil.component';
import { PersonasComponent } from './components/personas/personas.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { RolesComponent } from './components/roles/roles.component';
import { LlamadosComponent } from './components/llamados/llamados.component';

const routes: Routes = [
  {
    path:'tiposDeDocumento',
    component: TiposDeDocumentoComponent
  },
  {
    path:'areas',
    component: AreasComponent
  },
  {
    path:'tiposDeIntegrantes',
    component: TipoDeIntegranteComponent
  },
  {
    path:'llamadosEstadosPosibles',
    component: LlamadosEstadosPosiblesComponent
  },
  {
    path:'login',
    component: LoginPageComponent
  },
  {
    path:'navbar',
    component: NavigationComponent
  },
  {
    path:'miPerfil',
    component: MiPerfilComponent
  },
  {
    path:'personas',
    component: PersonasComponent
  },
  {
    path:'usuarios',
    component: UsuariosComponent
  },
  { path: 'restore-password', 
    component: RestorePasswordComponent 
  },
  { path: 'roles', 
    component: RolesComponent 
  },
  { path: 'llamados', 
    component: LlamadosComponent 
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
