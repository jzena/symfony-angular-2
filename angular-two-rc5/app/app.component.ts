// Importar Component desde el núcleo de Angular
import { Component } from '@angular/core';

// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'my-app',
    template: `
        <h1>Rutas con angular 2</h1>
        <nav>
            <a routerLink="/paises">Paises</a>
            <a routerLink="/ciudades">Ciudades</a>
            <a routerLink="/la-ciudad/12">La ciudad</a>
            <a routerLink="/mi-formulario">Mi formulario</a>
        </nav>
        <router-outlet></router-outlet>
    `
})

// Clase del componente donde irán los datos y funcionalidades
export class AppComponent { }