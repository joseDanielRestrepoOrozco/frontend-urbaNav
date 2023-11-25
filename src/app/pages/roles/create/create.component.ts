import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  theRole: Role;
  creationMode: boolean;
  formGroupValidator: FormGroup;

  constructor(private rolesService: RoleService,
              private router:Router,
              private rutaActiva:ActivatedRoute,
              private formBuilder: FormBuilder) { 
    this.theRole = {_id:"", name:"", description: ""}
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
      description : ['',[Validators.required]]
    });
  }

  get formGroupValidatorData(){
    return this.formGroupValidator.controls;
  }

  roleData() : Role{
    let theRole= new Role();
    theRole.name=this.formGroupValidatorData.name.value;
    theRole.description=this.formGroupValidatorData.description.value;
    return theRole;
  }

  show(id:number){
    this.rolesService.show(id).subscribe((jsonResponse: any) => {
      this.theRole=jsonResponse

      this.formGroupValidator.patchValue({
        _id: this.theRole._id,
        name: this.theRole.name,
        description: this.theRole.description
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
    this.theRole = this.roleData();
    
    console.log("Creando a " + JSON.stringify(this.theRole))
    this.rolesService.create(this.theRole).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: 'Creado', 
        icon: 'success',
      })
      this.router.navigate(["roles/list"])
    });
  }

  update(){
    this.rolesService.update(this.formGroupValidator.value).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: 'Actualizando',
        icon: 'success',
      })
      this.router.navigate(["roles/list"])
    });
  }

}
