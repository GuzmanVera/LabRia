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
import { TipoDeDocumentoDialogComponent } from './components/tipo-de-documento-dialog/tipo-de-documento-dialog.component';
import { TipoDeDocumentoDeleteDialogComponent } from './components/tipo-de-documento-delete-dialog/tipo-de-documento-delete-dialog.component';
import { AreasComponent } from './components/areas/areas.component';
import { AreasDialogComponent } from './components/areas-dialog/areas-dialog.component';
import { AreasDeleteDialogComponent } from './components/areas-delete-dialog/areas-delete-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TipoDeIntegranteComponent } from './components/tipo-de-integrante/tipo-de-integrante.component';
import { TipoDeIntegranteDialogComponent } from './components/tipo-de-integrante-dialog/tipo-de-integrante-dialog.component';
import { TipoDeIntegranteDeleteDialogComponent } from './components/tipo-de-integrante-delete-dialog/tipo-de-integrante-delete-dialog.component';
import { LlamadosEstadosPosiblesComponent } from './components/llamados-estados-posibles/llamados-estados-posibles.component';
import { LlamadosEstadosPosiblesDialogComponent } from './components/llamados-estados-posibles-dialog/llamados-estados-posibles-dialog.component';
import { LlamadosEstadosPosiblesDeleteDialogComponent } from './components/llamados-estados-posibles-delete-dialog/llamados-estados-posibles-delete-dialog.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
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
