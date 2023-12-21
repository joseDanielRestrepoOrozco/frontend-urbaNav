import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Console } from 'console';
import { Socket } from 'ngx-socket-io';
import { BillService } from 'src/app/services/bill.service';
import { CustomerService } from 'src/app/services/customer.service';
import { DriverService } from 'src/app/services/driver.service';
import { HelpersService } from 'src/app/services/helpers.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { TripService } from 'src/app/services/trip.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  longitud: string = '';
  latitud: string = '';
  wayPoints: WayPoints = { point: null }
  point: any[];

  @ViewChild('asGeoCoder') asGeoCoder: ElementRef

  constructor(private socket: Socket, private ServiceDriver: DriverService, private ServiceTrip: TripService, private customerService: CustomerService, private renderer2: Renderer2, private notificationsService: NotificationsService, private billService: BillService, private helpersService:HelpersService) { }

  ngOnInit(): void {
    this.customerService.buildMap()
      .then(({ map, geocoder, geocoder2 }) => {
        this.renderer2.appendChild(this.asGeoCoder.nativeElement,
          geocoder.onAdd(map)
        )
      })
      .catch((err) => {
        console.log('Error!!!!!', err)
      })

    this.customerService.cbAddress.subscribe((getPoint) => {
      console.log(getPoint)
    this.customerService.cbAddress.subscribe((getPoint) => {
      console.log(getPoint)
      this.wayPoints.point = getPoint.center;
      this.onSubmit()
    })
      this.onSubmit()
    })

  }

  onSubmit() {
    let conductor = null
    this.ServiceDriver.showForUser(JSON.parse(localStorage.getItem('session'))._id).subscribe((msg) => {
    this.ServiceDriver.showForUser(JSON.parse(localStorage.getItem('session'))._id).subscribe((msg) => {
      console.log(msg)

      msg.is_available = true
      conductor = msg
      this.ServiceDriver.update(msg)
    })
    this.socket.emit('coords', { point: this.wayPoints.point, conductor: localStorage.getItem('session') })
    this.socket.emit('coords', { point: this.wayPoints.point, conductor: localStorage.getItem('session') })

    this.socket.fromEvent('position').subscribe(async (msg: any) => {
    this.socket.fromEvent('position').subscribe(async (msg: any) => {
      console.log(msg)
      let cliente_user = msg.session
      let conductor_user = JSON.parse(localStorage.getItem('session'))
      console.log(cliente_user, conductor_user)
      let cliente: any
      let cliente: any

      console.log()
      this.ServiceDriver.showForUserCustomer(cliente_user._id).subscribe(async (data) => {
      this.ServiceDriver.showForUserCustomer(cliente_user._id).subscribe(async (data) => {
        cliente = data
        console.log(cliente, conductor)
        /*
aqui NO va el boton de panico
*/
 
        if (msg.driver === conductor_user.email) {
          Swal.fire({
            title: "Cliente",
            icon: "warning",
            text: `Encontramos un cliente cercano a: ${msg.duracion} segundos y  ${msg.distancia} metros`,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, me encantaria',
            cancelButtonText: 'No, quiero otro'
          }).then(async (result) => {
            if (result.isConfirmed) {
              await this.customerService.getRoute(msg.route)

              let trip = { "price": msg.precio, "status": true, "route_id": null, "customer_id": cliente.id, "driver_id": conductor.id }
    
              this.ServiceTrip.create(trip).subscribe((data:any) => { 
    
              // -------------------- # F A C T U R A # ---------------------
    
                this.socket.fromEvent('viaje').subscribe((ms) => {
                  let precio: number = msg.precio
      
                  let bill = {
                    "price": precio,
                    "date": this.helpersService.getFormattedDate(),
                    "trip_id": data.id
                  }
      
                  this.billService.create(bill).subscribe((data) => {
                    this.notificationsService.sendBill({
                      "email": cliente_user.email,
                      "subject": "Factura",
                      "body": `${precio}`
                    }).subscribe((dat) => {
                      console.log(dat)
                    })
                  })
      
                })
                
              })
            }
          })




        }
      })
    })



  }
}

export class WayPoints {
  point: any
}