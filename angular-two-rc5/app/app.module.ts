// Modulos
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Config Router
import { routing, appRoutingProvider } from './app.routing';

// Componentes
import { AppComponent } from './app.component';
import { PaisesComponent } from './components/paises.component';
import { CiudadesComponent } from './components/ciudades.component';

@NgModule({
  imports: [
    BrowserModule,
    routing
  ],
  declarations: [
    AppComponent,
    PaisesComponent,
    CiudadesComponent
  ],
  providers: [
    appRoutingProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }