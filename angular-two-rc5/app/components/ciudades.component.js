"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var CiudadesComponent = (function () {
    function CiudadesComponent(_route, _router) {
        this._route = _route;
        this._router = _router;
    }
    CiudadesComponent.prototype.ngOnInit = function () {
        var _this = this;
        // recoger parametros
        this._route.params.subscribe(function (params) {
            if (params['id'] != null) {
                _this.codigoPostal = +params['id'];
            }
        });
    };
    CiudadesComponent.prototype.redireccion = function () {
        this._router.navigate(['/paises']);
    };
    CiudadesComponent = __decorate([
        core_1.Component({
            selector: 'ciudades',
            template: "\n      <h2>Ciudades</h2>\n      <ul *ngIf=\"!codigoPostal\">\n           <li>Murcia</li>\n           <li>Valencia</li>\n           <li>Barcelona</li>\n           <li>Quito</li>\n           <li>Maxico DF</li>           \n           \n      </ul>\n\n      <p *ngIf=\"codigoPostal\">C\u00F3digo postal: {{codigoPostal}}</p>\n\n      <button (click)=\"redireccion()\">Ver Paises</button>\n\n    "
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router])
    ], CiudadesComponent);
    return CiudadesComponent;
}());
exports.CiudadesComponent = CiudadesComponent;
//# sourceMappingURL=ciudades.component.js.map