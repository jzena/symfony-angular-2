"use strict";
var router_1 = require('@angular/router');
var default_component_1 = require('./components/default.component');
var register_component_1 = require('./components/register.component');
var login_componet_1 = require('./components/login.componet');
exports.routes = [
    {
        path: '',
        redirectTo: '/index',
        terminal: true
    },
    { path: 'index', component: default_component_1.DefaultComponent },
    { path: 'login', component: login_componet_1.LoginComponent },
    { path: 'register', component: register_component_1.RegisterComponent }
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map