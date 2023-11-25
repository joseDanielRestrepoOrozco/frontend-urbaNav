import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Point } from 'src/app/models/point';
import { HelpersService } from 'src/app/services/helpers.service';
import { PointService } from 'src/app/services/point.service';

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
        response.data.forEach((point)=>{
          point.created_at = this.helpers.convertDate(point.created_at)
          point.updated_at = this.helpers.convertDate(point.updated_at)
        })
        this.points = response.data;
      },
      (error) => {
        console.error('Error al obtener los puntos:', error);
      }
    );
  }
  create() {
    console.log('creando');
    this.router.navigate(['points/create'])
  }
  update(id: number) {
    console.log('editando' + id);
    // this.router.navigate([`movies/update/${id}`],)
  }
  delete(id: number) {
    console.log('eliminando' + id);
  }
  

}
