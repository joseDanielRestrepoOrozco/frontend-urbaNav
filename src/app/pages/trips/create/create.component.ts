import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  theTrip: Trip;
  creationMode: boolean;
  formGroupValidator: FormGroup;

  constructor(
    private tripsService: TripService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.theTrip = {
      date: "",
      price: 0,
      status: null,
      route_id: 0,
      customer_id: 0,
      driver_id: 0
    }
    this.creationMode = true;
  }

  ngOnInit(): void {
    this.formBuilding();
    if (this.rutaActiva.snapshot.params.id) {
      this.creationMode = false;
      this.show(this.rutaActiva.snapshot.params.id);
    }
  }

  formBuilding() {
    this.formGroupValidator = this.formBuilder.group({
      id: [''],
      date_Time: ['', [Validators.required]],
      price: ['', [Validators.required]],
      status: [true],
      route_id: ['', [Validators.required]],
      customer_id: ['', [Validators.required]],
      driver_id: ['', [Validators.required]]
    });
  }

  get formGroupValidatorData() {
    return this.formGroupValidator.controls;
  }

  tripData(): Trip {
    let theTrip = new Trip();
    theTrip.date = this.formGroupValidatorData.date_Time.value;
    theTrip.price = this.formGroupValidatorData.price.value;
    theTrip.status = this.formGroupValidatorData.status.value;
    theTrip.route_id = this.formGroupValidatorData.route_id.value;
    theTrip.customer_id = this.formGroupValidatorData.customer_id.value;
    theTrip.driver_id = this.formGroupValidatorData.driver_id.value;
    return theTrip;
  }

  show(id: number) {
    this.tripsService.show(id).subscribe((jsonResponse: any) => {
      this.theTrip = jsonResponse
      console.log(this.theTrip)
      this.theTrip.date = this.transformatDate(this.theTrip.date);

      this.formGroupValidator.patchValue({
        id: this.theTrip.id,
        date_time: this.theTrip.date,
        price: this.theTrip.price,
        status: this.theTrip.status,
        route_id: this.theTrip.route_id,
        customer_id: this.theTrip.customer_id,
        driver_id: this.theTrip.driver_id,
      });
    });
  }

  create() {
    if (this.formGroupValidator.invalid) {
      Swal.fire({
        title: 'Formulario Incorrecto',
        icon: 'error',
        timer: 3000
      });
      return false;
    }
    this.theTrip = this.tripData();

    console.log("Creando a " + JSON.stringify(this.theTrip))
    this.tripsService.create(this.theTrip).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: 'Creado',
        icon: 'success',
      });
      this.router.navigate(["trips/list"]);
    });
  }

  update() {
    this.tripsService.update(this.formGroupValidator.value).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: 'Actualizando',
        icon: 'success',
      });
      this.router.navigate(["trips/list"]);
    });
  }

  transformatDate(theDate: string): string {
    const theDateObject = new Date(theDate);
    return `${theDateObject.getFullYear()}-${theDateObject.getMonth() + 1}-${theDateObject.getDate()}`;
  }
}
