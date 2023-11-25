import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },

    { path: 'registration',   
    children: [
    {
        path: '',
        loadChildren: () => import('src/app/pages/registration/registration.module').then(m => m.RegistrationModule )
    }]} 
];
