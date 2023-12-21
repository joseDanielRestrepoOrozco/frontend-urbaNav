import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { CodeVerificationComponent } from 'src/app/pages/code-verification/code-verification.component';
import { NonAuthenticatedGuard } from 'src/app/guards/non-authenticated.guard';

export const AuthLayoutRoutes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NonAuthenticatedGuard] },
  {
    path: 'registration',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/registration/registration.module').then(m => m.RegistrationModule)
      }],
    canActivate: [NonAuthenticatedGuard]
  },
  {
    path: 'cambio-contraseña',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/cambio-contraseña/cambio-contraseña.module').then(m => m.CambioContraseñaModule)
      }],
  },
  { path: 'code-verification', component: CodeVerificationComponent }
];
