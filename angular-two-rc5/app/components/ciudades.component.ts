import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ciudades',
    template: `
      <h2>Ciudades</h2>
      <ul *ngIf="!codigoPostal">
           <li>Murcia</li>
           <li>Valencia</li>
           <li>Barcelona</li>
           <li>Quito</li>
           <li>Maxico DF</li>           
           
      </ul>

      <p *ngIf="codigoPostal">Código postal: {{codigoPostal}}</p>

      <button (click)="redireccion()">Ver Paises</button>

    `
})
export class CiudadesComponent implements OnInit {
    public codigoPostal: number;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit() {
        // recoger parametros
        this._route.params.subscribe(params => {
            if (params['id'] != null) {
                this.codigoPostal = +params['id'];
            }
        });
    }

    redireccion(){
        this._router.navigate(['/paises']);
    }
}