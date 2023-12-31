import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.scss']
})
export class InicialComponent implements OnInit {

  formGroupValidator: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router:Router,
    private notificationService:NotificationsService,
    private securityService:SecurityService) { }

  ngOnInit(): void {
    this.formBuilding()
  }

  codigo(){
    if(this.formGroupValidator.invalid) {
      Swal.fire({
        title: 'Formulario Incorrecto',
        icon: 'error',
        timer: 3000
      });
      return false;
    }
    let theUser=this.userData()
    // Guardar el correo electrónico en el localStorage
    localStorage.setItem('userEmail', theUser.email);
    this.securityService.changePassword(theUser).subscribe({
      next: (data) => {
        if (data!==""){ 
          theUser._id=data;
          console.log(data)
          localStorage.setItem('userId', theUser._id);
          this.notificationService.changePassword(theUser).subscribe({
            next: (data) => {
              if (data) {
                this.router.navigate(["cambio-contraseña/codigo"]);
              } 
            },
      
            error: (error) => {
              Swal.fire({
                title: 'Error',
                text: 'Intentalo de nuevo',
                icon: 'error',
                timer:5000 
              });
            }
          });

        }
      },

      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Correo inválido',
          icon: 'error',
          timer:5000 
        });
      }
    });
    
  }

  formBuilding(){
    this.formGroupValidator=this.formBuilder.group({
      _id:[''],
      email : ['', [Validators.required, Validators.email]],
    });
  }

  get formGroupValidatorData(){
    return this.formGroupValidator.controls;
  }

  userData() : User{
    let theUser= new User();
    theUser.email=this.formGroupValidatorData.email.value;
    theUser._id=this.formGroupValidatorData._id.value;
    return theUser;
  }
}
