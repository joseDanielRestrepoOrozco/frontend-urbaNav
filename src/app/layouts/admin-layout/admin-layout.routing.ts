import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { VisionComponent } from 'src/app/pages/vision/vision.component';
import { MisionComponent } from 'src/app/pages/mision/mision.component';
import { AuthenticatedGuard } from 'src/app/guards/authenticated.guard';
import { DriverGuard } from 'src/app/guards/driver.guard';
import { AdministratorGuard } from 'src/app/guards/administrator.guard';
import { CustomerGuard } from 'src/app/guards/customer.guard';
import { SessionComponent } from 'src/app/pages/session/session.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthenticatedGuard] },
    { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'mision', component: MisionComponent },
    { path: 'vision', component: VisionComponent },

    {
        path: 'vehicles',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/vehicles/vehicles.module').then(m => m.VehiclesModule)
            }],
        canActivate: [AuthenticatedGuard] && [AdministratorGuard]
    },
    {
        path: 'drivers',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/drivers/drivers.module').then(m => m.DriversModule)
            }]
    },

    {
        path: 'bill',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/bill/bill.module').then(m => m.BillModule)
            }],
        canActivate: [AuthenticatedGuard] && [AdministratorGuard]
    },

    {
        path: 'customer',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/customer/customer.module').then(m => m.CustomerModule)
            }],
        canActivate: [AuthenticatedGuard] && [AdministratorGuard]
    },

    {
        path: 'payment-methods',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/payment-methods/payment-methods.module').then(m => m.PaymentMethodsModule)
            }]
    },

    {
        path: 'role-permissions',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/role-permissions/role-permissions.module').then(m => m.RolePermissionsModule)
            }],
        canActivate: [AuthenticatedGuard] && [AdministratorGuard]
    },
    {
        path: 'points',
        children: [{
            path: '',
            loadChildren: () => import('src/app/pages/points/points.module').then(point => point.PointsModule)
        }],
        canActivate: [AuthenticatedGuard] && [AdministratorGuard]
    },
    {
        path: 'permissions',
        children: [{
            path: '',
            loadChildren: () => import('src/app/pages/permissions/permissions.module').then(m => m.PermissionsModule)
        }],
        canActivate: [AuthenticatedGuard] && [AdministratorGuard]
    },

    {
        path: 'users',
        children: [{
            path: '',
            loadChildren: () => import('src/app/pages/users/users.module').then(m => m.UsersModule)
        }],
        canActivate: [AuthenticatedGuard] && [AdministratorGuard]
    },
    {
        path: 'routes',
        children: [{
            path: '',
            loadChildren: () => import('src/app/pages/routes/routes.module').then(m => m.RoutesModule)
        }]
    },
    {
        path: 'pqrs-cliente',
        children: [{
            path: '',
            loadChildren: () => import('src/app/pages/pqrs-cliente/pqrs-cliente.module').then(m => m.PqrsClienteModule)
        }],
        canActivate: [AuthenticatedGuard] && [CustomerGuard]
    },

    {
        path: 'pqrs',
        children: [{
            path: '',
            loadChildren: () => import('src/app/pages/pqrs/pqrs.module').then(m => m.PqrsModule)
        }],
        canActivate: [AuthenticatedGuard]
    },

    {
        path: 'roles',
        children: [{
            path: '',
            loadChildren: () => import('src/app/pages/roles/roles.module').then(m => m.RolesModule)
        }],
        canActivate: [AdministratorGuard]
    },

    {
        path: 'trips',
        children: [{
            path: '',
            loadChildren: () => import('src/app/pages/trips/trips.module').then(m => m.TripsModule)
        }],
        canActivate: [AdministratorGuard]
    },
    {
        path: 'ratings',
        children: [{
            path: '',
            loadChildren: () => import('src/app/pages/ratings/ratings.module').then(m => m.RatingsModule)
        }],
        canActivate: [AdministratorGuard]
    },
    { path: 'session', component: SessionComponent },
    {
        path: 'change-login',
        children: [{
            path: '',
            loadChildren: () => import('src/app/pages/change-login/change-login.module').then(m => m.ChangeLoginModule)
        }],
        canActivate: [AdministratorGuard]
    }
];
