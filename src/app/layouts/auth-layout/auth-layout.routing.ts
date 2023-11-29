import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { NonAuthenticatedGuard } from 'src/app/guards/non-authenticated.guard';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent, canActivate: [NonAuthenticatedGuard] },

    { path: 'registration',   
    children: [
    {
        path: '',
        loadChildren: () => import('src/app/pages/registration/registration.module').then(m => m.RegistrationModule )
    }],
    canActivate: [NonAuthenticatedGuard] 
} 
];
