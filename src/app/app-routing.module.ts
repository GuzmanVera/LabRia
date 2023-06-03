import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiposDeDocumentoComponent } from './components/tipos-de-documento/tipos-de-documento.component';
import { AreasComponent } from './components/areas/areas.component';
import { TipoDeIntegranteComponent } from './components/tipo-de-integrante/tipo-de-integrante.component';
import { LlamadosEstadosPosiblesComponent } from './components/llamados-estados-posibles/llamados-estados-posibles.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NavigationComponent } from './navigation/navigation.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
