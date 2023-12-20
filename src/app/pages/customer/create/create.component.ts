import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { Socket } from 'ngx-socket-io';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @ViewChild('asGeoCoder') asGeoCoder: ElementRef
  @ViewChild('asGeoCoder2') asGeoCoder2: ElementRef
  wayPoints: WayPoints = { start: null, end: null }
  modeInput = 'start'
  precio: number | null = null;

  constructor(private customerService: CustomerService, private renderer2: Renderer2, private socket: Socket) { }


  changeMode(mode: string): void {
    this.modeInput = mode
  }

  prueba(): void {
    this.customerService.addMarkerCustom([-75.4925698, 5.0569691], null);
  }

  seguir(): void {
    //this.customerService.getRoute()
  }




  async driver(): Promise<void> {
    let session = JSON.parse(localStorage.getItem('session'))
    let driver = await this.customerService.findDriver(session, [
      this.wayPoints.start.center,
      this.wayPoints.end.center
    ])
    try {


      console.log('conductor cercano', driver)
      console.log(driver.point)
      this.socket.emit('position', { 'driver': driver.user, 'session': session, 'precio': this.precio, 'route': [driver.point, this.wayPoints.end.center] })
    } catch (error) {
      console.log('ERROR: NO funciona socket')
    }
  }


  ngOnInit(): void {
    this.customerService.buildMap()
      .then(({ map, geocoder, geocoder2 }) => {
        this.renderer2.appendChild(this.asGeoCoder.nativeElement,
          geocoder.onAdd(map)
        )
        this.renderer2.appendChild(this.asGeoCoder2.nativeElement,
          geocoder2.onAdd(map)
        )
      })
      .catch((err) => {
        console.log('Error!!!!!', err)
      })

    this.customerService.cbAddress.subscribe((getPoint) => {
      console.log(getPoint)
      this.wayPoints.start = getPoint;
    })
    this.customerService.cbAddress2.subscribe((getPoint) => {
      console.log(getPoint)
      this.wayPoints.end = getPoint;
      const coords = [
        this.wayPoints.start.center,
        this.wayPoints.end.center
      ];
      this.customerService.loadCoords(coords)

    })
    this.socket.once('drivers', (data) => {
      console.log(data)
      data.forEach(msg => {
        let conductor = JSON.parse(msg['conductor'])
        this.customerService.addMarkerCustom(msg['point'], conductor);
      });

    })

    this.socket.fromEvent('coords').subscribe((msg) => {
      console.log(msg)

      let conductor = JSON.parse(msg['conductor'])

      /*Swal.fire({
        title: "Conductor Cercano",
        icon: "info",
        text: `${conductor['name']} te quiere llevar aceptas?`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      });*/

      this.customerService.addMarkerCustom(msg['point'], conductor);
    })

    this.socket.fromEvent('position_driver').subscribe((msg: any) => {
      console.log(msg.session, msg.route)
      this.customerService.addMarkerCustom(msg.route, msg.session)
      console.log(this.wayPoints.end.center[0].toFixed(4) === msg.route[0].toFixed(4), msg.route[0].toFixed(4), this.wayPoints.end.center[0].toFixed(4))
      if (this.wayPoints.end.center[0].toFixed(3) === msg.route[0].toFixed(3)) {
        Swal.fire({
          title: "Conductor Cercano",
          icon: "info",
          text: `Termino el viaje princeso`,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si',
          cancelButtonText: 'No'
        });


        /*
        aqui termina el viaje
        */
      }
    })

  }






}

export class WayPoints {
  start: any;
  end: any
}


