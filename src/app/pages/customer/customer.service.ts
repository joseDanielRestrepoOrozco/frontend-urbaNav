import { EventEmitter, Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { rejects } from 'assert';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v12'
  long = -74.006;
  lat = 40.7128;
  zoom: 3;
  wayPoints:Array<any> = [];
  markerDriver: any;

  constructor(private httpClient: HttpClient) {
    this.mapbox.accessToken = 'pk.eyJ1IjoianVhbnZlbCIsImEiOiJja2UxZjRzNW4yeTdrMnNtcHF2YmptNXZjIn0.QsPuUwiiCaAv-OVd_-vD4g';
   }

   cbAddress: EventEmitter<any> = new EventEmitter<any>();

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

      geocoder.on('result',($event)=>{
        const {result} = $event
        console.log($event)
        this.cbAddress.emit(result);
      })

        resolve({
          map:this.map,
          geocoder
        })
      } catch (error) {
        rejects(error)
      }
      
    })
  }

  loadCoords(coords): void{
    console.log("Coordenadas --->",coords)
    const url= [
      'https://api.mapbox.com/directions/v5/mapbox/driving/',
        `${coords[0][0]},${coords[0][1]};${coords[1][0]},${coords[1][1]}`,
        `?steps=true&geometries=geojson&access_token=${environment.mapPK}`
    ].join('')

    this.httpClient.get(url).subscribe((res:any)=>{
      const data = res.routes[0];
      const route = data.geometry.coordinates;
      console.log(route)
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
          'line-width': 10
        }
      })

      this.wayPoints = route;
      this.map.fitBounds([route[0], route[route.length -1]],{
        padding: 50
      })
    })



  }


  getRoute():void{
    console.log("Esto es el listado", this.wayPoints);

  let index = 0;

  const intervalId = setInterval(() => {
    if (index < this.wayPoints.length) {
      const point = this.wayPoints[index];
      console.log(point);
      this.addMarkerCustom(point);
      index++;
    } else {
      clearInterval(intervalId); 
    }
  }, 1000); 
  }


  addMarkerCustom(coords):void{
    console.log(coords)

    const dom = document.createElement('div');
    dom.className = 'marker';
    dom.style.width = '24px';
    dom.style.height = '24px';
    //background-image: url("../../../../assets/img/customer/carro.png");
    dom.style.backgroundImage = 'url("../../../assets/img/customer/carro.png")';
    dom.style.backgroundSize = 'contain';
    dom.style.backgroundRepeat = 'no-repeat';
    dom.style.backgroundPosition = 'center';
    console.log(dom)
    if(!this.markerDriver){
      this.markerDriver = new mapboxgl.Marker(dom);
      this.markerDriver.setLngLat(coords).addTo(this.map);
    console.log(this.markerDriver)
    }else{
      this.markerDriver.setLngLat(coords).addTo(this.map);
    console.log(this.markerDriver)
    }
   
    

  }


  
}
