import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
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

  constructor(private usersService: UserService,
              private router:Router,
              private rutaActiva:ActivatedRoute,
              private formBuilder: FormBuilder) { 
    this.theUser = {_id:"", name:"", surname: "", phone:"", birthdate:"2023-05-02", email:"",password:""}
    this.creationMode = true;
  }

  ngOnInit(): void {
    this.formBuilding();
    if (this.rutaActiva.snapshot.params.id){
      this.creationMode=false;
      this.show(this.rutaActiva.snapshot.params.id)
    }
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
      // role: ['',[Validators.required]]
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
    // theUser.role=this.formGroupValidatorData.role.value;
    return theUser;
  }

  show(id:number){
    this.usersService.show(id).subscribe((jsonResponse: any) => {
      this.theUser=jsonResponse
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
    
    console.log("Creando a " + JSON.stringify(this.theUser))
    this.usersService.create(this.theUser).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: 'Creado', 
        icon: 'success',
      })
      this.router.navigate(["users/list"])
    });
  }

  update(){
    this.usersService.update(this.formGroupValidator.value).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: 'Actualizando',
        icon: 'success',
      })
      this.router.navigate(["users/list"])
    });
  }

  // transformatDate(theDate: string): string {
  //   const theDateObject = new Date(theDate);
  //   return `${theDateObject.getFullYear()}-${theDateObject.getMonth() + 1}-${theDateObject.getDate()}`;
  // }

}
