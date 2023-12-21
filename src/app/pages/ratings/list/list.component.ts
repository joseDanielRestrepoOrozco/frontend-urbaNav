import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rating } from 'src/app/models/rating.model';
import { RatingService } from 'src/app/services/rating.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  ratings: Rating[]

  constructor(private ratingsService: RatingService,
    private router: Router) { }

  ngOnInit(): void {
    this.ratingsService.list().subscribe((jsonResponse: any) => {
      this.ratings = jsonResponse.data;
    });
  }

  create() {
    this.router.navigate(["ratings/create"])
  }

  edit(id: number) {
    console.log("Editando a " + id)
    this.router.navigate(["ratings/update/" + id])
  }

  delete(id: number) {
    console.log("Eliminando a " + id)
    Swal.fire({
      title: 'Eliminar',
      text: "Está seguro que quiere eliminar la reseña?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ratingsService.delete(id).subscribe(data => {
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
