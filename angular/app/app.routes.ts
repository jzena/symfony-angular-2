
import { provideRouter, RouterConfig } from '@angular/router';

import { DefaultComponent } from './components/default.component';
import { RegisterComponent } from './components/register.component';
import { LoginComponent } from './components/login.componet';

export const routes: RouterConfig = [
    {
        path: '',
        redirectTo: '/index',
        terminal: true
    },
    { path: 'index', component: DefaultComponent },
    { path: 'login', component: LoginComponent },
    { path: 'login/:id', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];
export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];