import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RolePermission } from "src/app/models/role-permission.model";
import { RolePermissionService } from "src/app/services/role-permission.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements OnInit {
  theRolepermission: RolePermission;
  creationMode: boolean;
  formGroupValidator: FormGroup;

  constructor(private rolepermissionsService: RolePermissionService,
              private router:Router,
              private rutaActiva:ActivatedRoute,
              private formBuilder: FormBuilder) {
    this.theRolepermission = {_id:""}
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
      // role: ['',[Validators.required]]
      // permission: ['',[Validators.required]]
    });
  }

  get formGroupValidatorData(){
    return this.formGroupValidator.controls;
  }

  rolepermissionData() : RolePermission{
    let theRolepermission = new RolePermission();
    // theRolepermission.role=this.formGroupValidatorData.role.value;
    // theRolepermission.permission=this.formGroupValidatorData.permission.value;
    return theRolepermission;
  }

  show(id:number){
    this.rolepermissionsService.show(id).subscribe((jsonResponse: any) => {
      this.theRolepermission=jsonResponse

      this.formGroupValidator.patchValue({
        _id: this.theRolepermission._id,
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
    this.theRolepermission = this.rolepermissionData();
    
    console.log("Creando a " + JSON.stringify(this.theRolepermission))
    this.rolepermissionsService.create(this.theRolepermission).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: 'Creado', 
        icon: 'success',
      })
      this.router.navigate(["role-permissions/list"])
    });
  }

  update(){
    this.rolepermissionsService.update(this.formGroupValidator.value).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: 'Actualizando',
        icon: 'success',
      })
      this.router.navigate(["role-permissions/list"])
    });
  }

}
