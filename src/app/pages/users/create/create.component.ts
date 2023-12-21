import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/models/role.model';
import { User } from 'src/app/models/user.model';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  theUser: User;
  creationMode: boolean;
  formGroupValidator: FormGroup;
  selectedRole: Role = { _id: '', name: '', description: '' };
  passwordField: any = { type: 'password' }; 

  constructor(private usersService: UserService,
              private router:Router,
              private roleService: RoleService,
              private rutaActiva:ActivatedRoute,
              private formBuilder: FormBuilder) { 
    this.theUser = {_id:"", name:"", surname: "", phone:"", birthdate:"2023-05-02", email:"",password:"", role: {}}
    this.creationMode = true;
  }

  ngOnInit(): void {
    this.formBuilding();
    if (this.rutaActiva.snapshot.params.id) {
      this.creationMode = false;
      this.show(this.rutaActiva.snapshot.params.id)
    }
    this.roleService.list().subscribe((roles: Role[]) => {
      if (roles.length > 0) {
        this.selectedRole = roles[2];
      }
    });
  }

  formBuilding() {
    this.formGroupValidator = this.formBuilder.group({
      _id: [''],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      // role: ['',[Validators.required]]
    });
  }

  get formGroupValidatorData() {
    return this.formGroupValidator.controls;
  }

  userData(): User {
    let theUser = new User();
    theUser.name = this.formGroupValidatorData.name.value;
    theUser.surname = this.formGroupValidatorData.surname.value;
    theUser.phone = this.formGroupValidatorData.phone.value;
    theUser.birthdate = this.formGroupValidatorData.birthdate.value;
    theUser.email = this.formGroupValidatorData.email.value;
    theUser.password = this.formGroupValidatorData.password.value;
    // theUser.role=this.formGroupValidatorData.role.value;
    return theUser;
  }

  show(id: number) {
    this.usersService.show(id).subscribe((jsonResponse: any) => {
      this.theUser = jsonResponse
      // this.theUser.birthdate=this.transformatDate(this.theUser.birthdate)

      this.formGroupValidator.patchValue({
        _id: this.theUser._id,
        name: this.theUser.name,
        surname: this.theUser.surname,
        phone: this.theUser.phone,
        birthdate: this.theUser.birthdate,
        email: this.theUser.email,
        password: this.theUser.password
      });
    });
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

  create() {

    if (this.formGroupValidator.invalid) {
      Swal.fire({
        title: 'Formulario Incorrecto',
        icon: 'error',
        timer: 3000
      });
      return false;
    }
    this.theUser = this.userData();
    this.theUser.role = this.selectedRole;
    
    console.log("Creando a " + JSON.stringify(this.theUser))
    this.usersService.create(this.theUser).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: 'Creado',
        icon: 'success',
      })
      this.router.navigate(["users/list"])
    });
  }

  update() {
    this.usersService.update(this.formGroupValidator.value).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: 'Actualizando',
        icon: 'success',
      })
      this.router.navigate(["users/list"])
    });
  }

}
