import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  vehicles:Vehicle[]

  constructor(private vehiclesService: VehicleService,
              private router: Router) { }

  ngOnInit(): void {
    this.vehiclesService.list().subscribe((jsonResponse:any) => {
      this.vehicles = jsonResponse.data; 
    });
  }

  create(){
    this.router.navigate(["vehicles/create"])
  }

  edit(id:number){
    console.log("Editando a " + id)
    this.router.navigate(["vehicles/update/" + id])
  }

  delete(id:number){
    console.log("Eliminando a " + id)
    Swal.fire({
      title: 'Eliminar',
      text: "Está seguro que quiere eliminar el vehiculo?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehiclesService.delete(id).subscribe(data => {
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
