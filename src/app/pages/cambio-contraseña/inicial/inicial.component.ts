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
    this.securityService.changePassword(theUser).subscribe({
      next: (data) => {
        if (data){ 
          this.notificationService.changePassword(theUser).subscribe({
            next: (data) => {
              console.log(data)
              this.router.navigate(["cambio-contraseña/codigo"])
              // this.securityService.saveSessionData(data);
            },
      
            error: (error) => {
              Swal.fire({
                title: 'Error',
                text: error,
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
      email : ['', [Validators.required, Validators.email]],
    });
  }

  get formGroupValidatorData(){
    return this.formGroupValidator.controls;
  }

  userData() : User{
    let theUser= new User();
    theUser.email=this.formGroupValidatorData.email.value;
    return theUser;
  }
}
