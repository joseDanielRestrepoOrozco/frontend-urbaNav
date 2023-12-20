import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  formGroupValidator: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private router:Router,
              private securityService:SecurityService,
              private notificationsService:NotificationsService) {}

  ngOnInit() {
    this.formBuilding()
  }

  cambio(){
    this.router.navigate(["cambio-contraseña/inicial"])
  }

  registrarse(){
    this.router.navigate(["registration/inicial"])
  }

  formBuilding(){
    this.formGroupValidator=this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  login() {
    if (this.formGroupValidator.invalid) {
      Swal.fire({
        title: 'Formulario Incorrecto',
        icon: 'error',
        timer: 3000
      });
      return;
    }
  
    let theUser = this.userData();
    this.securityService.login(theUser).subscribe({
      next: (data) => {
        if (data) { // Si el login es exitoso
          // Almacena el correo electrónico y la contraseña en el local storage
          localStorage.setItem('userEmail', theUser.email);
          localStorage.setItem('userPassword', theUser.password);
  
          // Obtener el código de sesión
          this.securityService.getSessionCode(theUser.email).subscribe({
            next: (sessionCode) => {
              // Llama al servicio de notificaciones para enviar el código al correo del usuario
              this.notificationsService.sendEmail({
                email: theUser.email,
                subject: 'Tu código de verificación',
                body: `${sessionCode}`
              }).subscribe({
                next: (response) => {
                  // Redirige al usuario a la página de verificación de código
                  this.router.navigate(['/code-verification']);
                },
                error: (error) => {
                  Swal.fire({
                    title: 'Error al enviar correo',
                    text: error.message,
                    icon: 'error',
                    timer: 5000 
                  });
                }
              });
            },
            error: (error) => {
              Swal.fire({
                title: 'Error al obtener código de sesión',
                text: error.message,
                icon: 'error',
                timer: 5000 
              });
            }
          });
        }
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Usuario o contraseña inválido',
          icon: 'error',
          timer: 5000 
        });
      }
    });
  }
  
  // getUserFromToken(token: string) {
  //   console.log(token)
  //   this.securityService.getUserFromToken(token).subscribe({
  //     next: dataUser =>{
  //       let theUser:User={
  //         "_id":dataUser["_id"],
  //         "name":dataUser["name"],
  //         "email":dataUser["email"],
  //         "token": token,
  //         "role":dataUser["role"],
  //       }
  //       this.securityService.saveSessionData(theUser);
  //     }
  //   })
  // }


  ngOnDestroy() {
  }

  get formGroupValidatorData(){
    return this.formGroupValidator.controls;
  }

  userData() : User{
    let theUser= new User();
    theUser.email=this.formGroupValidatorData.email.value;
    theUser.password=this.formGroupValidatorData.password.value;
    return theUser;
  }

}
