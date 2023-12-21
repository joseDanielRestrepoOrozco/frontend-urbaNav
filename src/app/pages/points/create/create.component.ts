import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Point } from 'src/app/models/point';
import { PointService } from 'src/app/services/point.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean
  formGroupValidator: FormGroup;
  point: Point

  constructor(private pointService: PointService, private router: Router,
    private rutaActiva: ActivatedRoute,
    private formBuilder: FormBuilder) {
    this.point = { id: null, name: null, latitude: null, longitude: null }
    this.creationMode = true
  }

  ngOnInit(): void {
    this.formBuilding();
    if (this.rutaActiva.snapshot.params.id) {
      this.creationMode = false;
      this.show(this.rutaActiva.snapshot.params.id)
    }
  }
  formBuilding() {
    this.formGroupValidator = this.formBuilder.group({
      name: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]]
    });
  }

  get formGroupValidatorData() {
    return this.formGroupValidator.controls;
  }

  show(id: number) {
    this.pointService.show(id).subscribe((response: any) => {
      this.point = response

      this.formGroupValidator.patchValue({
        name: this.point.name,
        latitude: this.point.latitude,
        longitude: this.point.longitude
      });
    });
  }

  pointData(): Point {
    let point = new Point();
    point.name = this.formGroupValidatorData.name.value;
    point.latitude = this.formGroupValidatorData.latitude.value;
    point.longitude = this.formGroupValidatorData.longitude.value;
    return point;
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

    this.point = this.pointData();

    // console.log("Creando a " + JSON.stringify(this.point))
    this.pointService.create(this.point).subscribe((response: any) => {
      Swal.fire({
        title: 'Punto creado satisfactoriamente!',
        icon: 'success',
      })
      this.router.navigate(["points/list"])
    });
  }

  update() {
    if (this.formGroupValidator.invalid) {
      Swal.fire({
        title: 'Formulario Incorrecto',
        icon: 'error',
        timer: 3000
      });
      return false;
    }

    this.point = this.pointData();
    this.point.id = this.rutaActiva.snapshot.params.id

    this.pointService.update(this.point).subscribe((response: any) => {
      Swal.fire({
        title: 'Actualizado!',
        icon: 'success',
      })
      this.router.navigate(["points/list"])
    });
  }
}
