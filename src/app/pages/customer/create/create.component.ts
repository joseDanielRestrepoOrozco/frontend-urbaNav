import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { Socket } from 'ngx-socket-io';
import { NotificationsService } from 'src/app/services/notifications.service';
import Swal from 'sweetalert2';
import { error } from 'console';


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

  constructor(private customerService: CustomerService, private renderer2: Renderer2, private socket: Socket, private notificationsService:NotificationsService) { }


  changeMode(mode: string): void {
    this.modeInput = mode
  }

  prueba(): void {
    this.customerService.addMarkerCustom([-75.4925698, 5.0569691],null);
  }

  seguir(): void {
    //this.customerService.getRoute()
  }




  async driver(): Promise<void> {
    let session=JSON.parse(localStorage.getItem('session'))
    let driver = await this.customerService.findDriver(session,[
      this.wayPoints.start.center,
      this.wayPoints.end.center
    ])
    try {
      
    
    console.log('conductor cercano',driver)
    console.log(driver.point)
    this.socket.emit('position',{'driver': driver.user, 'session':session, 'precio':this.precio, 'route':[driver.point,this.wayPoints.end.center]})
  } catch (error) {
      console.log('ERROR: NO funciona socket')
  }
  }


  botonPanico(): void {
    // Obtener el ID y el nombre del usuario logueado
    const session = JSON.parse(localStorage.getItem('session'));
    const userId = session?._id;
    const userName = session?.name; // Asegúrate de que el nombre esté almacenado en la sesión
  
    if (userId && userName) {
      this.customerService.getCustomerByUserId(userId).subscribe(customer => {
        if (customer && customer.contact_emergency) {
          this.sendPanicEmail(customer.contact_emergency, userName);
        } else {
          console.error("no hay un contacto de emergencia")
        }
      }, error => {
        console.error("el cliente no se encontró")
      });
    }
  }
  
  private sendPanicEmail(emergencyEmail: string, userName: string): void {
    const emailData = {
      email: emergencyEmail,
      subject: 'Botón de pánico',
      body: `El usuario ${userName} se encuentra en peligro`
    };
  
    this.notificationsService.sendPanic(emailData).subscribe({
      next: (response) => {
        console.log("correo enviado");
        Swal.fire({
          title: 'Correo Enviado',
          text: 'Se ha enviado un correo a tu contacto de emergencia.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      },
      error: (error) => {
        console.error("hubo un error mandando el correo de boton de panico");
        Swal.fire({
          title: 'Error',
          text: 'No se pudo enviar el correo al contacto de emergencia.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
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
    this.socket.once('drivers', (data)=>{
      console.log(data)
      data.forEach(msg => {
        let conductor= JSON.parse(msg['conductor'])
        this.customerService.addMarkerCustom(msg['point'],conductor);
      });
     
    })

    this.socket.fromEvent('coords').subscribe((msg)=>{
      console.log(msg)

      let conductor= JSON.parse(msg['conductor'])

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
     
      this.customerService.addMarkerCustom(msg['point'],conductor);
    })

    this.socket.fromEvent('position_driver').subscribe((msg:any)=>{
      console.log(msg.session, msg.route)
      this.customerService.addMarkerCustom(msg.route,msg.session)
      console.log(this.wayPoints.end.center[0].toFixed(4) === msg.route[0].toFixed(4), msg.route[0].toFixed(4),this.wayPoints.end.center[0].toFixed(4))
      if(this.wayPoints.end.center[0].toFixed(3) === msg.route[0].toFixed(3)){
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


