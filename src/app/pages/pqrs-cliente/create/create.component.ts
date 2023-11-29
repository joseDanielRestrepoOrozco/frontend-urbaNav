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
  formGroupValidator: FormGroup;

  constructor(private pqrsService: PqrsService,
    private router:Router,
    private formBuilder: FormBuilder ) {
    this.thePqrs = {_id:"", type:"", description: "", date:"2023-05-02"}
}

  ngOnInit(): void {
    this.formBuilding();
  }

  formBuilding(){
    this.formGroupValidator=this.formBuilder.group({
      _id : [''],
      type : ['',[Validators.required]],
      description : ['',[Validators.required]],
      date : ['',[Validators.required]],
    });
  }

  pqrsData() : Pqrs{
    let thePqrs= new Pqrs();
    thePqrs.type=this.formGroupValidatorData.type.value;
    thePqrs.description=this.formGroupValidatorData.description.value;
    thePqrs.date=this.formGroupValidatorData.date.value;
    return thePqrs;
  }

  get formGroupValidatorData(){
    return this.formGroupValidator.controls;
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
        title: 'Enviado', 
        icon: 'success',
      })
      this.router.navigate(["pqrs/list"])
    });
  }

}
