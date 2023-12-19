import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambio',
  templateUrl: './cambio.component.html',
  styleUrls: ['./cambio.component.scss']
})
export class CambioComponent implements OnInit {

  userId: string = ''

  formGroupValidator: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private router:Router,
              private securityService:SecurityService) { }

  ngOnInit(): void {
    this.formBuilding()
    this.userId = localStorage.getItem('userId') || '';
  }

  formBuilding(){
    this.formGroupValidator=this.formBuilder.group({
      password : ['', [Validators.required, Validators.minLength(2)]],
      confirmPassword : ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  get formGroupValidatorData(){
    return this.formGroupValidator.controls;
  }

  userData() : User{
    let theUser= new User();
    theUser.password=this.formGroupValidatorData.password.value;
    theUser.password=this.formGroupValidatorData.confirmPassword.value;
    return theUser;
  }

  password() {
    if(this.formGroupValidator.invalid) {
      Swal.fire({
        title: 'Formulario Incorrecto',
        icon: 'error',
        timer: 3000
      });
      return false;
    }
  
    const newPassword = this.formGroupValidatorData.password.value;
    const confirmPassword = this.formGroupValidatorData.confirmPassword.value;

    // Verifica que las contraseñas sean iguales
    if (newPassword !== confirmPassword) {
      Swal.fire({
        title: 'Contraseñas no coinciden',
        text: 'Por favor, asegúrate de que las contraseñas coincidan.',
        icon: 'error',
        timer: 5000
      });
      return false;
    }
  
    this.securityService.password(this.userId, newPassword).subscribe({
      next: (data) => {
        if (data) {
          if (this.userId) {
            this.router.navigate(['login']);
            this.securityService.deleteSession(this.userId).subscribe({
              next: () => console.log('Sesión iniciada'),
              error: error => console.error('Error al eliminar la tabla de sesión', error)
            });
          }
        } else {
          error: (error) => {
            Swal.fire({
              title: 'Error en la verificación',
              text: error,
              icon: 'error',
              timer: 5000 
            });
          }
        }
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: error,
          icon: 'error',
          timer: 5000 
        });
      }
    });
  }

}
