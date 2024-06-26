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
import { AdminGuard } from './services/admin-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { ResponsabilidadesComponent } from './components/responsabilidades/responsabilidades.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  { 
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'tiposDeDocumento',
    component: TiposDeDocumentoComponent,
    canActivate: [AdminGuard]
  },
  {
    path:'areas',
    component: AreasComponent,
    canActivate: [AdminGuard]
  },
  {
    path:'tiposDeIntegrantes',
    component: TipoDeIntegranteComponent,
    canActivate: [AdminGuard]
  },
  {
    path:'llamadosEstadosPosibles',
    component: LlamadosEstadosPosiblesComponent,
    canActivate: [AdminGuard]
  },
  {
    path:'login',
    component: LoginPageComponent
  },
  {
    path:'navbar',
    component: NavigationComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'miPerfil',
    component: MiPerfilComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'personas',
    component: PersonasComponent,
    canActivate: [AdminGuard]
  },
  {
    path:'usuarios',
    component: UsuariosComponent,
    canActivate: [AdminGuard]
  },
  { path: 'restore-password', 
    component: RestorePasswordComponent 
  },
  { path: 'roles', 
    component: RolesComponent,
    canActivate: [AdminGuard]
  },
  { path: 'llamados', 
    component: LlamadosComponent ,
    canActivate: [AuthGuard]
  },
  { path: 'responsabilidades', 
    component: ResponsabilidadesComponent,
    canActivate: [AdminGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
