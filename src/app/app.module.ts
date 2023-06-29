import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from './material.module';
import { LoginComponent } from './login-component/login-component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TableComponent } from './table/table.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TiposDeDocumentoComponent } from './components/tipos-de-documento/tipos-de-documento.component';
import { HttpClientModule } from '@angular/common/http';
import { TipoDeDocumentoDialogComponent } from './components/tipos-de-documento/tipo-de-documento-dialog/tipo-de-documento-dialog.component';
import { TipoDeDocumentoDeleteDialogComponent } from './components/tipos-de-documento/tipo-de-documento-delete-dialog/tipo-de-documento-delete-dialog.component';
import { AreasComponent } from './components/areas/areas.component';
import { AreasDialogComponent } from './components/areas/areas-dialog/areas-dialog.component';
import { AreasDeleteDialogComponent } from './components/areas/areas-delete-dialog/areas-delete-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TipoDeIntegranteComponent } from './components/tipo-de-integrante/tipo-de-integrante.component';
import { TipoDeIntegranteDialogComponent } from './components/tipo-de-integrante/tipo-de-integrante-dialog/tipo-de-integrante-dialog.component';
import { TipoDeIntegranteDeleteDialogComponent } from './components/tipo-de-integrante/tipo-de-integrante-delete-dialog/tipo-de-integrante-delete-dialog.component';
import { LlamadosEstadosPosiblesComponent } from './components/llamados-estados-posibles/llamados-estados-posibles.component';
import { LlamadosEstadosPosiblesDialogComponent } from './components/llamados-estados-posibles/llamados-estados-posibles-dialog/llamados-estados-posibles-dialog.component';
import { LlamadosEstadosPosiblesDeleteDialogComponent } from './components/llamados-estados-posibles/llamados-estados-posibles-delete-dialog/llamados-estados-posibles-delete-dialog.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { MiPerfilComponent } from './components/perfil/mi-perfil/mi-perfil.component';
import { PersonasComponent } from './components/personas/personas.component';
import { PersonasDialogComponent } from './components/personas/personas-dialog/personas-dialog.component';
import { PersonasDeleteDialogComponent } from './components/personas/personas-delete-dialog/personas-delete-dialog.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuariosDialogComponent } from './components/usuarios/usuarios-dialog/usuarios-dialog.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { UsuariosRoleDialogComponent } from './components/usuarios/usuarios-role-dialog/usuarios-role-dialog.component';
import { RolesComponent } from './components/roles/roles.component';
import { LlamadosComponent } from './components/llamados/llamados.component';
import { LlamadosDialogComponent } from './components/llamados/llamados-dialog/llamados-dialog.component';
import { LlamadosDeleteDialogComponent } from './components/llamados/llamados-delete-dialog/llamados-delete-dialog.component';
import { LlamadosVerInfoComponent } from './components/llamados/llamados-ver-info/llamados-ver-info.component';
import { LlamadosAdministrarEstadosComponent } from './components/llamados/llamados-administrar-estados/llamados-administrar-estados.component';
import { LlamadosModificarEstadosComponent } from './components/llamados/llamados-modificar-estados/llamados-modificar-estados.component';
import { LlamadosTribunalComponent } from './components/llamados/llamados-tribunal/llamados-tribunal.component';
import { AgregarMiembroTribunalComponent } from './components/llamados/llamados-tribunal/agregar-miembro-tribunal/agregar-miembro-tribunal.component';
import { ResponsabilidadesComponent } from './components/responsabilidades/responsabilidades.component';
import { ResponsabilidadesDialogComponent } from './components/responsabilidades/responsabilidades-dialog/responsabilidades-dialog.component';
import { ResponsabilidadesDeleteDialogComponent } from './components/responsabilidades/responsabilidades-delete-dialog/responsabilidades-delete-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginPageComponent,
    TableComponent,
    NavigationComponent,
    TiposDeDocumentoComponent,
    TipoDeDocumentoDialogComponent,
    TipoDeDocumentoDeleteDialogComponent,
    AreasComponent,
    AreasDialogComponent,
    AreasDeleteDialogComponent,
    TipoDeIntegranteComponent,
    TipoDeIntegranteDialogComponent,
    TipoDeIntegranteDeleteDialogComponent,
    LlamadosEstadosPosiblesComponent,
    LlamadosEstadosPosiblesDialogComponent,
    LlamadosEstadosPosiblesDeleteDialogComponent,
    MiPerfilComponent,
    PersonasComponent,
    PersonasDialogComponent,
    PersonasDeleteDialogComponent,
    UsuariosComponent,
    UsuariosDialogComponent,
    RestorePasswordComponent,
    UsuariosRoleDialogComponent,
    RolesComponent,
    LlamadosComponent,
    LlamadosDialogComponent,
    LlamadosDeleteDialogComponent,
    LlamadosVerInfoComponent,
    LlamadosAdministrarEstadosComponent,
    LlamadosModificarEstadosComponent,
    LlamadosTribunalComponent,
    AgregarMiembroTribunalComponent,
    ResponsabilidadesComponent,
    ResponsabilidadesDialogComponent,
    ResponsabilidadesDeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
