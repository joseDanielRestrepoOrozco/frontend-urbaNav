import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Console } from 'console';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users:User[]

  constructor(private usersService:UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.usersService.list().subscribe((jsonResponse:any) => {
      this.users = jsonResponse; 
      console.log(jsonResponse)
    });
    
  }

  create(){
    this.router.navigate(["users/create"])
  }

  edit(_id:number){
    console.log("Editando a " + _id)
    this.router.navigate(["users/update/" + _id])
  }



  delete(_id:number, role:string){
    console.log("Eliminando a " + _id)
    Swal.fire({
      title: 'Eliminar',
      text: "Está seguro que quiere eliminar el usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.delete(_id,role)
        .subscribe(data => {
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
