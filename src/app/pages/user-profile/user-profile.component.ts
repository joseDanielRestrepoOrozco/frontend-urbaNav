import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/models/role.model';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  theUser: User
  subscription: Subscription;
  formGroupValidator: FormGroup;
  formGroupValidatorDriver: FormGroup;
  constructor(
    private securityService: SecurityService,
    private userService: UserService,
    private formBuilder: FormBuilder
    ) { 
      this.theUser = {_id:"", name:"", surname: "", phone:"", birthdate:"2023-05-02", email:"",password:"", role: {}}
    }

  ngOnInit() {
    this.formBuilding()
    this.subscription = this.securityService.getUser().subscribe(data =>{
      this.theUser = data
      this.show()
    });
  }

  formBuilding(){
    this.formGroupValidator = this.formBuilder.group({
      _id: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(1)]],
      surname: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(1)]],
      phone: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(0)]],
      birthdate: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(12)]],
      role: ['']
    });
  }

  get formGroupValidatorData(){
    return this.formGroupValidator.controls;
  }

  userData(): User {
    let theUser= new User();
    theUser.name=this.formGroupValidatorData.name.value;
    theUser.surname=this.formGroupValidatorData.surname.value;
    theUser.phone=this.formGroupValidatorData.phone.value;
    theUser.birthdate=this.formGroupValidatorData.birthdate.value;
    theUser.email=this.formGroupValidatorData.email.value;
    theUser.password=this.formGroupValidatorData.password.value;
    return theUser;
  }

  show(){
    const sessionData = localStorage.getItem('session');
    if(sessionData){
      this.theUser = JSON.parse(sessionData)  
        this.formGroupValidator.patchValue({
          _id: this.theUser._id,
          name: this.theUser.name,
          surname: this.theUser.surname,
          phone: this.theUser.phone,
          birthdate: this.theUser.birthdate,
          email: this.theUser.email,
          role: this.theUser.role ? this.theUser.role.name : ''
        });

    }
  }

  update(){
    
    if (this.formGroupValidator.value.password === '') {
      Swal.fire({
        title: 'nesecita ingresar la contraseña para editar perfil',
        icon: 'error',
        timer:5000
      });
      return false;

    } else if (this.formGroupValidator.invalid) {
      Swal.fire({
        title: 'Formulario invalido',
        icon: 'error',
        timer:3000
      });
      return false;
    }
    this.securityService.verifyPassword(this.formGroupValidator.value._id, this.formGroupValidator.value.password).subscribe((jsonResponse: any) => {
      if (jsonResponse) {
        let newUser:User = {
          ["_id"]: this.formGroupValidator.value._id,
          ["name"]: this.formGroupValidator.value.name,
          ["surname"]: this.formGroupValidator.value.surname,
          ["phone"]:this.formGroupValidator.value.phone,
          ["email"]: this.formGroupValidator.value.email,
          ["birthdate"]: this.formGroupValidator.value.birthdate,
          ["password"]: this.formGroupValidator.value.password
        }

        this.userService.update(newUser).subscribe((response: any) => {
        
          let session:User = this.securityService.userActiveSession
          
          session = {...session,
            name: newUser.name,
            surname: newUser.surname,
            phone: newUser.phone,
            email: newUser.email,
            birthdate: newUser.birthdate
          }

        this.securityService.logout()
        this.securityService.saveSessionData(session)
        Swal.fire({
           title: 'Perfil Actualizado',
           icon: 'success',
           timer: 3000
        });
        })
      } else {
        Swal.fire({
          title: 'Contraseña incorrecta',
          icon: 'error',
          timer: 3000
        });
      }
    });
  }
}
