import { Component } from '@angular/core';

@Component({
    selector: 'paises',
    templateUrl: 'app/views/mi-formulario.component.html'
})
export class MiFormularioComponent {
    
    public enviado = false;
    public categorias = ['accion', 'terror', 'comedia', 'aventura'];
    public pelicula = {
        'titulo': '',
        'categoria': ''
    };

    onSubmit(){
        this.enviado = true;
    }


}