import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.scss']
})
export class InicialComponent implements OnInit {

  formGroupValidator: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router:Router,
    private securityService:SecurityService) { }

  ngOnInit(): void {
    this.formBuilding()
  }

  codigo(){
    this.router.navigate(["cambio-contraseña/codigo"])
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
