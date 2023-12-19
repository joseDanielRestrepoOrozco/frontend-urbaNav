import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit {

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

}
