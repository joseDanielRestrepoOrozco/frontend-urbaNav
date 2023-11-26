import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permission } from 'src/app/models/permission.model';
import { PermissionService } from 'src/app/services/permission.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  permissions:Permission[]

  constructor(private permissionService: PermissionService,
  private router: Router) { }

  ngOnInit(): void {
    this.permissionService.list().subscribe((jsonResponse:any) => {
      this.permissions = jsonResponse;
    });
  }

  create(){
    this.router.navigate(["permissions/create"])
  }

  edit(_id:string){
    console.log("Editando a " + _id)
    this.router.navigate(["permissions/update/" + _id])
  }

  delete(_id:string){
    console.log("Eliminando a " + _id)
    Swal.fire({
      title: 'Eliminar',
      text: "Está seguro que quiere eliminar el permiso?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.permissionService.delete(_id).subscribe(data => {
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
