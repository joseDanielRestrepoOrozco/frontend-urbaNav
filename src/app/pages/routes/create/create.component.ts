import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from 'src/app/models/route.model';
import { RouteService } from 'src/app/services/route.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  theRoute: Route;
  creationMode: boolean;
  formGroupValidator: FormGroup;

  constructor(
    private routesService: RouteService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.theRoute = { id: 0, name: ""}
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
      id : [''],
      name: ['', [Validators.required]]
    });
  }

  get formGroupValidatorData() {
    return this.formGroupValidator.controls;
  }

  routeData(): Route {
    let theRoute = new Route();
    theRoute.name = this.formGroupValidatorData.name.value;
    return theRoute;
  }

  show(id: number) {
    this.routesService.show(id).subscribe((jsonResponse: any) => {
      this.theRoute = jsonResponse

      this.formGroupValidator.patchValue({
        id : this.theRoute.id,
        name: this.theRoute.name,
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
    this.theRoute = this.routeData();

    console.log("Creando a " + JSON.stringify(this.theRoute))
    this.routesService.create(this.theRoute).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: 'Creado',
        icon: 'success',
      });
      this.router.navigate(["routes/list"]);
    });
  }

  update() {
    this.routesService.update(this.formGroupValidator.value).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: 'Actualizando',
        icon: 'success',
      });
      this.router.navigate(["routes/list"]);
    });
  }
}