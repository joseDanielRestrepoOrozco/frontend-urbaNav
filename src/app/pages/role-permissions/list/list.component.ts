import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RolePermission } from 'src/app/models/role-permission.model';
import { RolePermissionService } from 'src/app/services/role-permission.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  rolepermissions:RolePermission[]

  constructor(private rolepermissionsService:RolePermissionService,
              private router: Router) { }

  ngOnInit(): void {
    this.rolepermissionsService.list().subscribe((jsonResponse:any) => {
      this.rolepermissions = jsonResponse; 
      console.log(jsonResponse)
    });
  }

  create(){
    this.router.navigate(["role-permissions/create"])
  }

  edit(_id:number){
    console.log("Editando a " + _id)
    this.router.navigate(["role-permissions/update/" + _id])
  }

  delete(_id:number){
    console.log("Eliminando a " + _id)
    Swal.fire({
      title: 'Eliminar',
      text: "Está seguro que quiere eliminar el permiso de este rol?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolepermissionsService.delete(_id).subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'Eliminación culminada exitosamente',
              'success'
            )
            this.ngOnInit();
          });
      }
    })

  }
}




