import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role.model';
import { User } from 'src/app/models/user.model';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {

  theUser: User;
  formGroupValidator: FormGroup;
  selectedRole: Role = { _id: '', name: '', description: '' }
  passwordField: any = { type: 'password' }; 

  constructor(private usersService: UserService,
    private router:Router,
    private roleService: RoleService,
    private formBuilder: FormBuilder) { 
    this.theUser = {_id:"", name:"", surname: "", phone:"", birthdate:"2023-05-02", email:"",password:"", role: {}}
}

  ngOnInit(): void {
    this.formBuilding();
    this.roleService.list().subscribe((roles: Role[]) => {
      if (roles.length > 0) {
        this.selectedRole = roles[0];
      }
    });
  }

  formBuilding(){
    this.formGroupValidator=this.formBuilder.group({
      _id : [''],
      name : ['',[Validators.required]],
      surname : ['',[Validators.required]],
      phone:['',[Validators.required]],
      birthdate : ['',[Validators.required]],
      email : ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]],
    });
  }

  get formGroupValidatorData(){
    return this.formGroupValidator.controls;
  }

  userData() : User{
    let theUser= new User();
    theUser.name=this.formGroupValidatorData.name.value;
    theUser.surname=this.formGroupValidatorData.surname.value;
    theUser.phone=this.formGroupValidatorData.phone.value;
    theUser.birthdate=this.formGroupValidatorData.birthdate.value;
    theUser.email=this.formGroupValidatorData.email.value;
    theUser.password=this.formGroupValidatorData.password.value;
    return theUser;
  }

  togglePasswordVisibility() {
    const passwordInput = document.getElementById('password-input') as HTMLInputElement;

    if (passwordInput) {
      passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    }
  }

  create(){
    
    if(this.formGroupValidator.invalid){
      Swal.fire({
        title: 'Formulario Incorrecto',
        icon: 'error',
        timer:3000
      });
      return false;
    }
    this.theUser = this.userData();
    this.theUser.role = this.selectedRole;
    
    console.log("Creando a " + JSON.stringify(this.theUser))
    this.usersService.create(this.theUser).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: 'Registrado exitosamente', 
        icon: 'success',
      })
      this.router.navigate(["users/list"])
    });
  }

}
