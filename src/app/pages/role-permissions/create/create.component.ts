import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RolePermission } from "src/app/models/role-permission.model";
import { RolePermissionService } from "src/app/services/role-permission.service";

import { RoleService } from 'src/app/services/role.service';
import { PermissionService } from 'src/app/services/permission.service';
import { Role } from "src/app/models/role.model";
import { Permission } from "src/app/models/permission.model";
import Swal from "sweetalert2";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements OnInit {
  theRolepermission: RolePermission;
  creationMode: boolean;
  form: FormGroup = this.fb.group({
      role: new FormControl('',[Validators.required]),
      permission: new FormControl('',[Validators.required])
    });

  roles: Role[] = [];
  permissions: Permission[] = [];

  constructor(private rolepermissionsService: RolePermissionService,
              private router:Router,
              private rutaActiva:ActivatedRoute,
              private fb: FormBuilder,
              private roleService: RoleService,
              private permissionService: PermissionService,) {
   
    this.creationMode = true;
}

  ngOnInit(): void {
    // this.form.reset({ role: '', permission: ''})
    this.loadRoles();
    this.loadPermissions();
    if (this.rutaActiva.snapshot.params.id){
      this.creationMode=false;
      this.show(this.rutaActiva.snapshot.params.id)
    }
  }

  

  loadRoles() {
    this.roleService.list().subscribe(data => {
      this.roles = data;
    });
  }
  
  loadPermissions() {
    this.permissionService.list().subscribe(data => {
      this.permissions = data;
    });
  }

  get formGroupValidatorData(){
    return this.form.controls;
  }

  rolepermissionData() : RolePermission{
    let theRolepermission = new RolePermission();
    // theRolepermission.role=this.formGroupValidatorData.role.value;
    // theRolepermission.permission=this.formGroupValidatorData.permission.value;
    return theRolepermission;
  }

  show(id:string){
    console.log(id)
    this.rolepermissionsService.show(id).subscribe((jsonResponse: any) => {
      console.log(jsonResponse)

      this.form.patchValue({
        _id: this.theRolepermission._id,
      });
    });
  }

  create(): void{
    
    if(this.form.invalid){
      Swal.fire({
        title: 'Formulario Incorrecto',
        icon: 'error',
        timer:3000
      });
      return;
    }
 
    this.rolepermissionsService.create(this.form.controls['role'].value,this.form.controls['permission'].value).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: 'Creado', 
        icon: 'success',
      })
      this.router.navigate(["role-permissions/list"])
    });
  }

  update(){
    if(this.form.invalid){
      Swal.fire({
        title: 'Formulario Incorrecto',
        icon: 'error',
        timer:3000
      });
      return;
    }

    this.rolepermissionsService.create(this.form.controls['role'].value,this.form.controls['permission'].value).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: 'Actualizando',
        icon: 'success',
      })
      this.router.navigate(["role-permissions/list"])
    });
  }

  onSubmit(){
    console.log(this.form.value)
  }

}
