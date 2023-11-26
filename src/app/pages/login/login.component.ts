import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
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
              private securityService:SecurityService) {}

  ngOnInit() {
    this.formBuilding()
  }
  formBuilding(){
    this.formGroupValidator=this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  login() {

    if(this.formGroupValidator.invalid) {
      Swal.fire({
        title: 'Formulario Incorrecto',
        icon: 'error',
        timer: 3000
      });
      return false;
    }
    let theUser=this.userData()
    this.securityService.login(theUser).subscribe({
      next: (data) => {
        console.log("llamando")
        console.log("resultado login "+ data)
        this.getUserFromToken(data)
        this.router.navigate(['pages/dashboard']);
        // this.securityService.saveSessionData(data);
      },

      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Usuario o contraseña inválido',
          icon: 'error',
          timer:5000 
        });
      }
    });



  }

  getUserFromToken(token: string) {
    this.securityService.getUserFromToken(token).subscribe({
      next: dataUser =>{
        console.log(dataUser)
        let theUser:User={
          "_id":dataUser["_id"],
          "name":dataUser["name"],
          "email":dataUser["email"],
          "token":dataUser["token"],
          "role":dataUser["role"],
        }
        this.securityService.saveSessionData(theUser);
      }
    })
  }


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
