import { EventEmitter, Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { rejects } from 'assert';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../models/vehicle.model';
import { Console } from 'console';
import { Socket } from 'ngx-socket-io';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v12'
  long = -74.006;
  lat = 40.7128;
  zoom= 3;
  index:number =0
  wayPoints:Array<any> = [];
  markerDrivers:Array<any> = [];
  markerDriver: any;

  constructor(private httpClient: HttpClient, private socket: Socket) {
    this.mapbox.accessToken = environment.mapPK
   }

   cbAddress: EventEmitter<any> = new EventEmitter<any>();
   cbAddress2: EventEmitter<any> = new EventEmitter<any>();

  buildMap(): Promise<any>{
    return new Promise((resolve,rejects)=>{
      console.log('Longitud:', this.long);
      console.log('Latitud:', this.lat);
      try {
        
        this.map =new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [-75.4925698, 5.0569691],
          zoom: 15
      });
        
      this.map.addControl(new mapboxgl.NavigationControl())

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl
      });

      const geocoder2 = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl
      });

      geocoder.on('result',($event)=>{
        const {result} = $event
        console.log($event)
        this.cbAddress.emit(result);
      })

      geocoder2.on('result',($event)=>{
        const {result} = $event
        console.log($event)
        this.cbAddress2.emit(result);
      })

        resolve({
          map:this.map,
          geocoder,
          geocoder2
        })
      } catch (error) {
        rejects(error)
      }
      
    })
  }


  async findDriver(session, coords): Promise<any> {
    console.log(this.markerDrivers, coords, session);
  
    for (const driver of this.markerDrivers) {
      const point = driver.point;
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${point[0]},${point[1]};${coords[0][0]},${coords[0][1]}?steps=true&geometries=geojson&access_token=${environment.mapPK}`;
  
      try {
        const res: any = await this.httpClient.get(url).toPromise();
        const data = res.routes[0];
        const route = data.geometry.coordinates;
  
        driver.ruta = route;
        driver.distancia = data.distance;
        driver.duracion = data.duration;
  
        console.log(driver);
      } catch (error) {
        console.error('Error en la solicitud HTTP', error);
      }
    }
  

    this.markerDrivers.sort((a, b) => a.distancia - b.distancia);
    console.log(this.markerDrivers);
    return this.markerDrivers[0]
  }
  

  loadCoords(coords): void{
    console.log("Coordenadas --->",coords)
    const url= [
      'https://api.mapbox.com/directions/v5/mapbox/driving/',
        `${coords[0][0]},${coords[0][1]};${coords[1][0]},${coords[1][1]}`,
        `?steps=true&geometries=geojson&access_token=${environment.mapPK}`
    ].join('')

    this.httpClient.get(url).subscribe((res:any)=>{
      console.log(res)
      const data = res.routes[0];
      const route = data.geometry.coordinates;
      console.log(route)
      console.log(res)
      this.map.addSource('route',{
        type:'geojson',
        data:{
          type:'Feature',
          properties: {},
          geometry:{
            type:'LineString',
            coordinates:route,
          }
        }
      })

      this.map.addLayer({
        id:'route',
        type:'line',
        source: 'route',
        layout:{
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint:{
          'line-color': 'blue',
          'line-width': 5
        }
      })

      this.wayPoints = route;
      this.map.fitBounds([route[0], route[route.length -1]],{
        padding: 50
      })
    })



  }


  getRoute(coords):void{
    console.log(coords,  `${coords[0][0]},${coords[0][1]};${coords[1][0]},${coords[1][1]}`)
    const url= [
      'https://api.mapbox.com/directions/v5/mapbox/driving/',
        `${coords[0][0]},${coords[0][1]};${coords[1][0]},${coords[1][1]}`,
        `?steps=true&geometries=geojson&access_token=${environment.mapPK}`
    ].join('')
    let wayPoints = []

    this.httpClient.get(url).subscribe((res:any)=>{
      const data = res.routes[0];
      console.log(data)
      wayPoints = data.geometry.coordinates;
      let index = 0;
    let session=JSON.parse(localStorage.getItem('session'))
  const intervalId = setInterval(() => {
    if (index < wayPoints.length) {
      const point = wayPoints[index];
      this.socket.emit('position_driver',{'session':session, 'route':point})
      console.log(point);
      this.addMarkerCustom(point,session);
      index++;
    } else {
      clearInterval(intervalId); 
    }
  }, 1000);
    })

  
  }

  getPoint(session):any{
    console.log(session)
    let conductor = null
    this.markerDrivers.forEach((driver)=>{
      console.log(session.email === driver.user)
      if(session.email === driver.user){
        console.log(driver)
        conductor = driver
      }
    })
    return conductor
  }

  addMarkerCustom(coords, session):void{
    console.log(coords)

    const dom = document.createElement('div');
    dom.className = 'marker';
    dom.style.width = '24px';
    dom.style.height = '24px';
    dom.style.backgroundImage = 'url("../../../assets/img/customer/carro.png")';
    dom.style.backgroundSize = 'contain';
    dom.style.backgroundRepeat = 'no-repeat';
    dom.style.backgroundPosition = 'center';

    let vehicles = null
    if(session != null){
    vehicles = this.getPoint(session)
    console.log(vehicles)
    if(vehicles != null){
      session.vehicles = 2
    }else{
      session.vehicles = 0
      console.log('paseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
    }
    }


    //con correo verificar y devolver vehicle
    
    //console.log(session,coords)
    console.log(session.vehicles === 0,session.vehicles)
    if((!this.markerDriver && session == null)||(session.vehicles === 0)){
      this.markerDriver = new mapboxgl.Marker(dom);
     
      this.markerDriver.setLngLat(coords).addTo(this.map);
      if(session != null){
        console.log('pase por aqui')
        this.markerDrivers.push({map:this.markerDriver, user:session.email, point:coords})
        console.log(this.markerDrivers)
      }
    }else{
      if(session != null){
        let mapa = vehicles.map.setLngLat(coords).addTo(this.map);
        this.markerDrivers[this.markerDrivers.findIndex(elemento => elemento.user === vehicles.user)].map =mapa 
        this.markerDrivers[this.markerDrivers.findIndex(elemento => elemento.user === vehicles.user)].point =coords 
      }else{
        this.markerDriver.setLngLat(coords).addTo(this.map);
      }
      
    }
   


  }


  
}
