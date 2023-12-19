import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit {

  userId: string = ''
  userEmail: string = ''
  formGroupValidator: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router:Router,
              private securityService:SecurityService) { }

  ngOnInit(): void {
    this.formBuilding()
    this.userId = localStorage.getItem('userId') || '';
    this.userEmail = localStorage.getItem('userEmail') || '';
  }

  formBuilding(){
    this.formGroupValidator=this.formBuilder.group({
      password : ['', [Validators.required, Validators.minLength(2)]],
      newPassword : ['', [Validators.required, Validators.minLength(2)]],
      confirmPassword : ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  get formGroupValidatorData(){
    return this.formGroupValidator.controls;
  }

  userData() : User{
    let theUser= new User();
    theUser.password=this.formGroupValidatorData.password.value;
    theUser.password=this.formGroupValidatorData.newPassword.value;
    theUser.password=this.formGroupValidatorData.confirmPassword.value;
    return theUser;
  }

  password2() {
    if(this.formGroupValidator.invalid) {
      Swal.fire({
        title: 'Formulario Incorrecto',
        icon: 'error',
        timer: 3000
      });
      return false;
    }
    const currentPassword = this.formGroupValidatorData.password.value;
    const newPassword = this.formGroupValidatorData.newPassword.value;
    const confirmPassword = this.formGroupValidatorData.confirmPassword.value;
  
    this.securityService.password2(currentPassword, newPassword, confirmPassword).subscribe(
      success => {
        if (success) {
          // La contraseña se cambió con éxito
          Swal.fire({
            title: 'Éxito',
            text: 'Contraseña cambiada exitosamente',
            icon: 'success',
            timer: 5000
          });
          this.router.navigate(['/dashboard']); // Puedes redirigir a donde desees
        } else {
          Swal.fire({
            title: 'Error',
            text: 'La contraseña actual no es correcta o las contraseñas nuevas no coinciden o estas poniendo la nueva contraseña igual que la actual',
            icon: 'error',
            timer: 5000
          });
        }
      },
      error => {
        Swal.fire({
          title: 'Error',
          text: 'errorsito',
          icon: 'error',
          timer: 5000 
        });
      }
    );
  }
}
