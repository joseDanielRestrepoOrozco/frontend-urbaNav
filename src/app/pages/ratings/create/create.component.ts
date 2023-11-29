import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rating } from 'src/app/models/rating.model';
import { RatingService } from 'src/app/services/rating.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  theRating: Rating;
  creationMode: boolean;
  formGroupValidator: FormGroup;

  constructor(
    private ratingsService: RatingService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.theRating = { id: 0, stars: 0, comment: "", trip_id: 0 }
    this.creationMode = true;
  }

  ngOnInit(): void {
    this.formBuilding();
    if (this.rutaActiva.snapshot.params.id) {
      this.creationMode = false;
      this.show(this.rutaActiva.snapshot.params.id);
    }
    // if (this.theRating.id) {
    //   this.show(this.theRating.id);
    // }
  }

  formBuilding() {
    this.formGroupValidator = this.formBuilder.group({
      id: [0, [Validators.required]],
      stars: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: [''],
      trip_id: ['', [Validators.required]]
    });
  }

  get formGroupValidatorData() {
    return this.formGroupValidator.controls;
  }

  ratingData(): Rating {
    let theRating = new Rating();
    theRating.stars = this.formGroupValidatorData.stars.value;
    theRating.comment = this.formGroupValidatorData.comment.value;
    theRating.trip_id = this.formGroupValidatorData.trip_id.value;
    return theRating;
  }

  show(id: number) {
    this.ratingsService.show(id).subscribe((jsonResponse: any) => {
      this.theRating = jsonResponse

      this.formGroupValidator.patchValue({
        id: this.theRating.id,
        stars: this.theRating.stars,
        comment: this.theRating.comment,
        trip_id: this.theRating.trip_id
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
    this.theRating = this.ratingData();

    console.log("Creando a " + JSON.stringify(this.theRating))
    this.ratingsService.create(this.theRating).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: 'Creado',
        icon: 'success',
      });
      this.router.navigate(["ratings/list"]);
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

      this.theRating = this.ratingData();

    this.ratingsService.update(this.formGroupValidator.value).subscribe((jsonResponse: any) => {
      Swal.fire({
        title: 'Actualizando',
        icon: 'success',
      });
      this.router.navigate(["ratings/list"]);
    });
  }
}
