import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
    { path: "list", component: ListComponent },
    { path: "create", component: CreateComponent },
    { path: "update/:id", component: CreateComponent }
]; // configuracion rutas internas del modulo de puntos

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PointsRoutingModule { }
