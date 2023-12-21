import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  theVehicle: Vehicle;
  creationMode: boolean;
  formGroupValidator: FormGroup;

  constructor(
    private vehiclesService: VehicleService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.theVehicle = { id: 0, brand: "", model: "", year: "2022-01-01", color: "", plate: "", passenger_capacity: 0, property_card: "", soat: "" }
    this.creationMode = true;
  }

  ngOnInit(): void {
    this.formBuilding();
    if (this.rutaActiva.snapshot.params.id) {
      this.creationMode = false;
      this.show(this.rutaActiva.snapshot.params.id);
    }
    // if (this.theVehicle.id) {
    //   this.show(this.theVehicle.id);
    // }
  }

  formBuilding() {
    this.formGroupValidator = this.formBuilder.group({
      id: [0, [Validators.required]],
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: ['', [Validators.required]],
      color: ['', [Validators.required]],
      plate: ['', [Validators.required]],
      passenger_capacity: ['', [Validators.required, Validators.min(1), Validators.max(4)]],
      property_card: ['', [Validators.required]],
      soat: ['', [Validators.required]]
    });
  }

  get formGroupValidatorData() {
    return this.formGroupValidator.controls;
  }

  vehicleData(): Vehicle {
    let theVehicle = new Vehicle();
    theVehicle.brand = this.formGroupValidatorData.brand.value;
    theVehicle.model = this.formGroupValidatorData.model.value;
    theVehicle.year = this.formGroupValidatorData.year.value;
    theVehicle.color = this.formGroupValidatorData.color.value;
    theVehicle.plate = this.formGroupValidatorData.plate.value;
    theVehicle.passenger_capacity = this.formGroupValidatorData.passenger_capacity.value;
    theVehicle.property_card = this.formGroupValidatorData.property_card.value;
    theVehicle.soat = this.formGroupValidatorData.soat.value;
    return theVehicle;
  }

  show(id: number) {
    this.vehiclesService.show(id).subscribe((jsonResponse: any) => {
      this.theVehicle = jsonResponse
      this.theVehicle.year = this.transformatDate(this.theVehicle.year);

      this.formGroupValidator.patchValue({
        id: this.theVehicle.id,
        brand: this.theVehicle.brand,
        model: this.theVehicle.model,
        year: this.theVehicle.year,
        color: this.theVehicle.color,
        plate: this.theVehicle.plate,
        passenger_capacity: this.theVehicle.passenger_capacity,
        property_card: this.theVehicle.property_card,
        soat: this.theVehicle.soat,
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
    this.theVehicle = this.vehicleData();

    console.log("Creando a " + JSON.stringify(this.theVehicle))
    this.vehiclesService.create(this.theVehicle).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: 'Creado',
        icon: 'success',
      });
      this.router.navigate(["vehicles/list"]);
    });
  }

  update() {
    this.vehiclesService.update(this.formGroupValidator.value).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: 'Actualizando',
        icon: 'success',
      });
      this.router.navigate(["vehicles/list"]);
    });
  }

  transformatDate(theDate: string): string {
    const theDateObject = new Date(theDate);
    return `${theDateObject.getFullYear()}-${theDateObject.getMonth() + 1}-${theDateObject.getDate()}`;
  }
}
