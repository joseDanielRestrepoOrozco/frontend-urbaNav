import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-cambio',
  templateUrl: './cambio.component.html',
  styleUrls: ['./cambio.component.scss']
})
export class CambioComponent implements OnInit {

  formGroupValidator: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private router:Router,
              private securityService:SecurityService) { }

  ngOnInit(): void {
    this.formBuilding()
  }

  formBuilding(){
    this.formGroupValidator=this.formBuilder.group({
      password : ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  get formGroupValidatorData(){
    return this.formGroupValidator.controls;
  }

  userData() : User{
    let theUser= new User();
    theUser.password=this.formGroupValidatorData.password.value;
    return theUser;
  }

}
