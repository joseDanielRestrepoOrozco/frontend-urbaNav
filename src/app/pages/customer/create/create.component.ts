import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CustomerService } from '../customer.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @ViewChild('asGeoCoder') asGeoCoder: ElementRef
  wayPoints: WayPoints = { start: null, end: null }
  modeInput = 'start'

  constructor(private customerService: CustomerService, private renderer2: Renderer2) { }


  changeMode(mode: string): void {
    this.modeInput = mode
  }

  prueba(): void {
    this.customerService.addMarkerCustom([-75.4925698, 5.0569691]);
  }

  seguir(): void {
    this.customerService.getRoute()
  }


  ngOnInit(): void {
    this.customerService.buildMap()
      .then(({ map, geocoder }) => {
        this.renderer2.appendChild(this.asGeoCoder.nativeElement,
          geocoder.onAdd(map)
        )
      })
      .catch((err) => {
        console.log('Error!!!!!', err)
      })

    this.customerService.cbAddress.subscribe((getPoint) => {
      console.log(getPoint)
      if (this.modeInput == 'start') {
        this.wayPoints.start = getPoint;
      }
      if (this.modeInput == 'end') {
        this.wayPoints.end = getPoint;
      }
    })


  }


  drawRoute() {
    console.log(this.wayPoints)
    console.log("aqui estoyy")
    const coords = [
      this.wayPoints.start.center,
      this.wayPoints.end.center
    ];
    this.customerService.loadCoords(coords)

  }



}

export class WayPoints {
  start: any;
  end: any
}