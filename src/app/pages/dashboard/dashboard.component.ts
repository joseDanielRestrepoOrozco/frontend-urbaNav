import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public login = '/login'
  public register = '/registration/inicial'

  constructor(private securityService: SecurityService) {}

  ngOnInit() {
    // el id del usuario se encuentra almacenado en el localstorage en este punto, despues de haberse logueado
    const sessionData = localStorage.getItem('session');
    if (sessionData) {
      const userData = JSON.parse(sessionData);
      const userId = userData._id;

      if (userId) {
        this.securityService.deleteSession(userId).subscribe({
          next: () => console.log('Sesión iniciada'),
          error: error => console.error('Error al eliminar la tabla de sesión', error)
        });
      }
    }
  }

}
