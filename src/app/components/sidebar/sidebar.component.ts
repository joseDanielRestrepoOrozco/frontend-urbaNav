import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  type: number;

}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-white', class: '', type: 1 },
  { path: '/users/list', title: 'Usuarios', icon: 'ni-single-02 text-white', class: '', type: 2 },
  { path: '/vehicles/list', title: 'Vehículos', icon: 'ni-single-02 text-white', class: '', type: 2 },
  { path: '/roles/list', title: 'Roles', icon: 'ni-single-02 text-white', class: '', type: 2 },
  { path: '/role-permissions/list', title: 'Roles-Permisos', icon: 'ni-single-02 text-white', class: '', type: 2 },
  { path: '/points/list', title: 'Puntos', icon: 'ni-sound-wave text-white', class: '', type: 2 },
  { path: '/routes', title: 'Rutas', icon: 'ni-sound-wave text-white', class: '', type: 2 },
  { path: '/points-route', title: 'Puntos Ruta', icon: 'ni-sound-wave text-white', class: '', type: 2 },
  { path: '/login', title: 'Login', icon: 'ni-key-25 text-white', class: '', type: 3 },
  { path: '/pqrs-cliente/create', title: 'PQRS', icon: 'ni-key-25 text-white', class: '', type: 2 },
  { path: '/registration/inicial', title: 'Register', icon: 'ni-circle-08 text-white', class: '', type: 3 },
  { path: '/mision', title: 'Misión', icon: 'ni-compass-04 text-white', class: '', type: 1 },
  { path: '/vision', title: 'Visión', icon: 'ni-send text-white', class: '', type: 1 },
  { path: '/icons', title: 'Icons', icon: 'ni-planet text-white', class: '', type: 1 },
  { path: '/maps', title: 'Maps', icon: 'ni-pin-3 text-white', class: '', type: 1 },
  { path: '/user-profile', title: 'User profile', icon: 'ni-single-02 text-white', class: '', type: 2 },
  { path: '/tables', title: 'Tables', icon: 'ni-bullet-list-67 text-white', class: '', type: 1 },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  theUser:User;
  subscription: Subscription;
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private securityService: SecurityService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.subscription=this.securityService.getUser().subscribe(data=>{
      this.theUser=data;
    })
  }
}
