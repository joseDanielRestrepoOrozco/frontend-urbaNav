import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pqrs } from 'src/app/models/pqrs.model';
import { PqrsService } from 'src/app/services/pqrs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  pqrs:Pqrs[]

  constructor(private pqrsService:PqrsService,
              private router: Router) { }

  ngOnInit(): void {
    this.pqrsService.list().subscribe((jsonResponse:any) => {
      this.pqrs = jsonResponse; 
      console.log(jsonResponse)
    });
  }

  
  create(){
    this.router.navigate(["pqrs/create"])
  }

  edit(_id:number){
    console.log("Editando a " + _id)
    this.router.navigate(["pqrs/update/" + _id])
  }

  delete(_id:number){
    console.log("Eliminando a " + _id)
    Swal.fire({
      title: 'Eliminar',
      text: "Está seguro que quiere eliminar el pqrs?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pqrsService.delete(_id).subscribe(data => {
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
