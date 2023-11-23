import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  roles:Role[]

  constructor(private rolesService:RoleService,
  private router: Router) { }

  ngOnInit(): void {
    this.rolesService.list().subscribe((jsonResponse:any) => {
      this.roles = jsonResponse; 
      console.log(jsonResponse)
    });
  }

  create(){
    this.router.navigate(["roles/create"])
  }

  edit(_id:number){
    console.log("Editando a " + _id)
    this.router.navigate(["roles/update/" + _id])
  }

  delete(_id:number){
    console.log("Eliminando a " + _id)
    Swal.fire({
      title: 'Eliminar',
      text: "Está seguro que quiere eliminar el rol?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolesService.delete(_id).subscribe(data => {
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
