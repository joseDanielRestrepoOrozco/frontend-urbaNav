import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
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
  selectedRole: Role = { _id: '', name: '', description: '' };
  contactEmergency: Customer = {_id:'', contactEmergency:''};
  thecustomer: Customer;
  passwordField: any = { type: 'password' }; 

  constructor(private usersService: UserService,
    private router:Router,
    private roleService: RoleService,
    private formBuilder: FormBuilder) { 
    this.theUser = {_id:"", name:"", surname: "", phone:"", birthdate:"2023-05-02", email:"",password:"", role: {}, customer:{}}
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
      contactEmergency: ['',[Validators.required]]
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
    theUser.customer.contactEmergency= this.formGroupValidatorData.contactEmergency.value;
    return theUser;
  }

  showPasswordRequirements = false;

  togglePasswordRequirementsVisibility() {
    this.showPasswordRequirements = !this.showPasswordRequirements;
  }


  togglePasswordVisibility() {
    const passwordInput = document.getElementById('password-input') as HTMLInputElement;

    if (passwordInput) {
      passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    }
  }

  checkPasswordRequirements() {
    const password = this.formGroupValidatorData.password.value;
  
    this.updatePasswordValidity('length', password.length >= 8);
    this.updatePasswordValidity('uppercase', /[A-Z]/.test(password));
    this.updatePasswordValidity('lowercase', /[a-z]/.test(password));
    this.updatePasswordValidity('number', /\d/.test(password));
    this.updatePasswordValidity('special', /[!@#$%^&*(),.?":{}|<>]/.test(password));
  
    // Actualiza el estado de los checkboxes
    this.updateCheckboxState('length', password.length >= 8);
    this.updateCheckboxState('uppercase', /[A-Z]/.test(password));
    this.updateCheckboxState('lowercase', /[a-z]/.test(password));
    this.updateCheckboxState('number', /\d/.test(password));
    this.updateCheckboxState('special', /[!@#$%^&*(),.?":{}|<>]/.test(password));
  }
  
  updateCheckboxState(requirement: string, isValid: boolean) {
    const checkbox = document.getElementById(`${requirement}-checkbox`) as HTMLInputElement;
  
    if (checkbox) {
      checkbox.checked = isValid;
    }
  }
  
  
  updatePasswordValidity(requirement: string, isValid: boolean) {
    const requirementsControl = this.formGroupValidator.controls['password'];
  
    if (isValid) {
      const currentErrors = requirementsControl.errors ? { ...requirementsControl.errors } : {};
      delete currentErrors[requirement];
  
      requirementsControl.setErrors(Object.keys(currentErrors).length === 0 ? null : currentErrors);
    } else {
      const currentErrors = requirementsControl.errors || {};
      requirementsControl.setErrors({ ...currentErrors, [requirement]: true });
    }
  }
  
  isPasswordValid(requirement: string) {
    return !this.formGroupValidatorData.password.errors || !this.formGroupValidatorData.password.errors[requirement];
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
      this.router.navigate(['login'])
    });
  }
}
