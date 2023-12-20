import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { RoleService } from 'src/app/services/role.service';
import { DriverService } from 'src/app/services/driver.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-driver',
  templateUrl: './create-driver.component.html',
  styleUrls: ['./create-driver.component.scss']
})
export class CreateDriverComponent implements OnInit {

  driver: User;
  formGroupValidator: FormGroup;
  passwordField: any = { type: 'password' };


  constructor(private driverService: DriverService, private router: Router, private roleService: RoleService, private formBuilder: FormBuilder) {
    this.driver = {
      name: null,
      surname: null,
      phone: null,
      email: null,
      birthdate: null,
      password: null,
      vehicle_id: null,
      is_available: false
    }
  }

  ngOnInit(): void {
    this.formBuilding();
    // this.roleService.list().subscribe((roles: Role[]) => {
    //   if (roles.length > 0) {
    //     this.selectedRole = roles[1];
    //   }
    // roles.forEach((role) => {
    //   if (role.name === "CONDUCTOR") {
    //     this.selectedRole = role
    //   }
    // })
    //   console.log(this.selectedRole);
    // });
  }

  formBuilding() {
    this.formGroupValidator = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', [Validators.required]],
      password: ['', [Validators.required]],
      vehicle_id: ['', [Validators.required, Validators.min(1)]]
    });
  }

  get formGroupValidatorData() {
    return this.formGroupValidator.controls;
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
    this.driver = this.driverData();
    this.driverService.create(this.driver).subscribe((response: any) => {
      Swal.fire({
        title: 'Te has registrado!',
        icon: 'success',
      })
      this.router.navigate(["dashboard"])
    });

  }

  driverData(): User {
    let driver = new User();
    driver.name = this.formGroupValidatorData.name.value;
    driver.surname = this.formGroupValidatorData.surname.value;
    driver.phone = this.formGroupValidatorData.phone.value;
    driver.email = this.formGroupValidatorData.email.value;
    driver.birthdate = this.formGroupValidatorData.birthdate.value;
    driver.password = this.formGroupValidatorData.password.value;
    driver.vehicle_id = this.formGroupValidatorData.vehicle_id.value;
    driver.is_available = false
    return driver;
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


}
