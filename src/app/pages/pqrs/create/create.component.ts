import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pqrs } from 'src/app/models/pqrs.model';
import { PqrsService } from 'src/app/services/pqrs.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  thePqrs: Pqrs;
  creationMode: boolean;
  formGroupValidator: FormGroup;

  constructor(private pqrsService: PqrsService,
              private router:Router,
              private rutaActiva:ActivatedRoute,
              private formBuilder: FormBuilder ) {
    this.thePqrs = {_id:"", type:"", description: "", date:"2023-05-02"}
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
      type : ['',[Validators.required]],
      description : ['',[Validators.required]],
      date : ['',[Validators.required]],
      // user: ['',[Validators.required]]
    });
  }

  get formGroupValidatorData(){
    return this.formGroupValidator.controls;
  }

  pqrsData() : Pqrs{
    let thePqrs= new Pqrs();
    thePqrs.type=this.formGroupValidatorData.type.value;
    thePqrs.description=this.formGroupValidatorData.description.value;
    thePqrs.date=this.formGroupValidatorData.date.value;
    // thePqrs.user=this.formGroupValidatorData.user.value;
    return thePqrs;
  }

  show(id:number){
    this.pqrsService.show(id).subscribe((jsonResponse: any) => {
      this.thePqrs=jsonResponse
      // this.thePqrs.date=this.transformatDate(this.thePqrs.date)

      this.formGroupValidator.patchValue({
        _id: this.thePqrs._id,
        type: this.thePqrs.type,
        description: this.thePqrs.description,
        date: this.thePqrs.date
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
    this.thePqrs = this.pqrsData();
    
    console.log("Creando a " + JSON.stringify(this.thePqrs))
    this.pqrsService.create(this.thePqrs).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: 'Creado', 
        icon: 'success',
      })
      this.router.navigate(["pqrs/list"])
    });
  }

  update(){
    this.pqrsService.update(this.formGroupValidator.value).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: 'Actualizando',
        icon: 'success',
      })
      this.router.navigate(["pqrs/list"])
    });
  }

  // transformatDate(theDate: string): string {
  //   const theDateObject = new Date(theDate);
  //   return `${theDateObject.getFullYear()}-${theDateObject.getMonth() + 1}-${theDateObject.getDate()}`;
  // }





}
