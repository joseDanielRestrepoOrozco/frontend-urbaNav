import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from 'src/app/models/route.model';
import { RouteService } from 'src/app/services/route.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  routes:Route[]

  constructor(private routesService: RouteService,
              private router: Router) { }

  ngOnInit(): void {
    this.routesService.list().subscribe((jsonResponse:any) => {
      this.routes = jsonResponse.data; 
    });
  }

  create(){
    this.router.navigate(["routes/create"])
  }

  edit(id:number){
    console.log("Editando a " + id)
    this.router.navigate(["routes/update/" + id])
  }

  delete(id:number){
    console.log("Eliminando a " + id)
    Swal.fire({
      title: 'Eliminar',
      text: "Está seguro que quiere eliminar la ruta?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.routesService.delete(id).subscribe(data => {
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
