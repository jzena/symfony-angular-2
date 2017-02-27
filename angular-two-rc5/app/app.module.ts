// Modulos
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Config Router
import { routing, appRoutingProvider } from './app.routing';

// Componentes
import { AppComponent } from './app.component';
import { PaisesComponent } from './components/paises.component';
import { CiudadesComponent } from './components/ciudades.component';
import { MiFormularioComponent } from './components/mi-formulario.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing    
  ],
  declarations: [
    AppComponent,
    PaisesComponent,
    CiudadesComponent,
    MiFormularioComponent
  ],
  providers: [
    appRoutingProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }