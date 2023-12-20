import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  trips: Trip[]

  constructor(private tripsService: TripService,
    private router: Router) { }

  ngOnInit(): void {
    this.tripsService.list().subscribe((jsonResponse: any) => {
      this.trips = jsonResponse.data;
    });

  }

  create() {
    this.router.navigate(["trips/create"])
  }

  edit(id: number) {
    console.log("Editando a " + id)
    this.router.navigate(["trips/update/" + id])
  }

  delete(id: number) {
    console.log("Eliminando a " + id)
    Swal.fire({
      title: 'Eliminar',
      text: "Está seguro que quiere eliminar el viaje?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tripsService.delete(id).subscribe(data => {
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

