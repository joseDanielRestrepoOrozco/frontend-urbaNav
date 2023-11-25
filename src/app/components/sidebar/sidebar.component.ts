import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-white', class: '' },
  { path: '/users/list', title: 'Usuarios', icon: 'ni-single-02 text-white', class: '' },
  { path: '/vehicles/list', title: 'Vehículos', icon: 'ni-single-02 text-white', class: '' },
  { path: '/roles/list', title: 'Roles', icon: 'ni-single-02 text-white', class: '' },
  { path: '/points/list', title: 'Puntos', icon: 'ni-sound-wave text-white', class: '' },
  { path: '/routes', title: 'Rutas', icon: 'ni-sound-wave text-white', class: '' },
  { path: '/points-route', title: 'Puntos Ruta', icon: 'ni-sound-wave text-white', class: '' },
  { path: '/login', title: 'Login', icon: 'ni-key-25 text-white', class: '' },
  { path: '/registration/inicial', title: 'Register', icon: 'ni-circle-08 text-white', class: '' },
  { path: '/mision', title: 'Misión', icon: 'ni-compass-04 text-white', class: '' },
  { path: '/vision', title: 'Visión', icon: 'ni-send text-white', class: '' },
  { path: '/icons', title: 'Icons', icon: 'ni-planet text-white', class: '' },
  { path: '/maps', title: 'Maps', icon: 'ni-pin-3 text-white', class: '' },
  { path: '/user-profile', title: 'User profile', icon: 'ni-single-02 text-white', class: '' },
  { path: '/tables', title: 'Tables', icon: 'ni-bullet-list-67 text-white', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
