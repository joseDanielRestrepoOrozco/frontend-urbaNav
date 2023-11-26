import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { VisionComponent } from 'src/app/pages/vision/vision.component';
import { MisionComponent } from 'src/app/pages/mision/mision.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
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
            }]
    },

    {
        path: 'users',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/users/users.module').then(m => m.UsersModule)
            }]
    },

    {
        path: 'roles',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/roles/roles.module').then(m => m.RolesModule)
            }]
    },

    {
        path: 'pqrs',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/pqrs/pqrs.module').then(m => m.PqrsModule)
            }]
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
            }]
    },
    {
        path: 'points',
        children: [{
            path: '',
            loadChildren: () => import('src/app/pages/points/points.module').then(point => point.PointsModule)
        }]
    },
    {
        path: 'permissions',
        children: [{
            path: '',
            loadChildren: () => import('src/app/pages/permissions/permissions.module').then(m => m.PermissionsModule)
        }]
    },
    {
        path: 'routes',
        children: [{
            path: '',
            loadChildren: () => import('src/app/pages/routes/routes.module').then(m => m.RoutesModule)
        }]
    }
];
