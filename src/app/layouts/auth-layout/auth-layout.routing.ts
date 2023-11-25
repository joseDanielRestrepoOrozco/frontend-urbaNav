import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },

    { path: 'registration',   
    children: [
    {
        path: '',
        loadChildren: () => import('src/app/pages/registration/registration.module').then(m => m.RegistrationModule )
    }]} 
];
