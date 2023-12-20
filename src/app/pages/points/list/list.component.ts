import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Point } from 'src/app/models/point';
import { HelpersService } from 'src/app/services/helpers.service';
import { PointService } from 'src/app/services/point.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  points: Point[]

  constructor(private pointService: PointService, private router: Router, private helpers: HelpersService) { }

  ngOnInit(): void {
    this.pointService.list().subscribe(
      (response: any) => {
        response.data.forEach((point) => {
          point.created_at = this.helpers.convertDate(point.created_at)
          point.updated_at = this.helpers.convertDate(point.updated_at)
        })
        this.points = response.data;
      }
    );
  }
  create() {
    this.router.navigate(['points/create'])
  }
  update(id: number) {
    this.router.navigate([`points/update/${id}`])
  }
  delete(id: number) {
    Swal.fire({
      title: 'Eliminar',
      text: "Está seguro que quiere eliminar el punto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {   
        this.pointService.delete(id).subscribe((data) => {
          Swal.fire(
            'Eliminado!',
            'Eliminación culminada exitosamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    });
  }


}
