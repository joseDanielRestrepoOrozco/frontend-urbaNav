import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission } from 'src/app/models/permission.model';
import { PermissionService } from 'src/app/services/permission.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  thePermission: Permission;
  creationMode: boolean;
  formGroupValidator: FormGroup;

  constructor(private permissionService: PermissionService,
              private router:Router,
              private rutaActiva:ActivatedRoute,
              private formBuilder: FormBuilder) { 
    this.thePermission = {_id:"", description: "", url: "", method: ""}
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
      description : ['',[Validators.required]],
      method : ['',[Validators.required]],
      url : ['',[Validators.required]]
    });
  }

  get formGroupValidatorData(){
    return this.formGroupValidator.controls;
  }

  permissionData() : Permission{
    let thePermission= new Permission();
    thePermission.description=this.formGroupValidatorData.description.value;
    thePermission.method=this.formGroupValidatorData.method.value;
    thePermission.url=this.formGroupValidatorData.url.value;
    return thePermission;
  }

  show(id:string){
    this.permissionService.show(id).subscribe((jsonResponse: any) => {
      this.thePermission=jsonResponse

      this.formGroupValidator.patchValue({
        _id: this.thePermission._id,
        description: this.thePermission.description,
        method: this.thePermission.method,
        url: this.thePermission.url
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
    this.thePermission = this.permissionData();
    
    console.log("Creando a " + JSON.stringify(this.thePermission))
    this.permissionService.create(this.thePermission).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: 'Creado', 
        icon: 'success',
      })
      this.router.navigate(["permissions/list"])
    });
  }

  update(){
    this.permissionService.update(this.formGroupValidator.value).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: 'Actualizando',
        icon: 'success',
      })
      this.router.navigate(["permissions/list"])
    });
  }
}
