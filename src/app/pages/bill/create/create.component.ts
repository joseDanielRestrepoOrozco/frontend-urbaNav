import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill } from 'src/app/models/bill.model';
import { BillService } from 'src/app/services/bill.service';
import { HelpersService } from 'src/app/services/helpers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  Bill: Bill;
  creationMode: boolean;
  bills: Bill[];
  formGroupValidator: FormGroup;

  constructor(private billService: BillService, private router: Router, private rutaActiva: ActivatedRoute, private helpers: HelpersService, private formBuilder: FormBuilder) {
    this.Bill = { id: this.rutaActiva.snapshot.params.id || 0, price: 0, date: "2023-05-02", trip_id: 0 }
    this.creationMode = true;
  }

  ngOnInit(): void {
    this.billService.list().subscribe((jsonResponse: any) => {
      this.bills = jsonResponse.data;
    });
    this.formBuilding();

    if (this.rutaActiva.snapshot.params.id) {
      this.creationMode = false;
      this.show(this.rutaActiva.snapshot.params.id)
      console.log(this.Bill)
    }

  }

  formBuilding() {
    this.formGroupValidator = this.formBuilder.group({
      id: [0, [Validators.required]],
      price: ['', [Validators.min(4500), Validators.max(200000), Validators.required]],
      date: ['', [Validators.required]],
      trip_id: ['', [Validators.required]],
    })
  }



  get formGroupValidatorData() {
    return this.formGroupValidator.controls;
  }



  billData(): Bill {
    let theBill = new Bill();
    theBill.price = this.formGroupValidatorData.price.value;
    theBill.date = this.formGroupValidatorData.date.value;
    theBill.trip_id = this.formGroupValidatorData.trip_id.value;
    return theBill;
  }



  show(id: number) {
    this.billService.show(id).subscribe((jsonResponse: any) => {
      this.Bill = jsonResponse;
      console.log(jsonResponse)
      this.Bill.date = this.transformatDate(this.Bill.date)

      this.formGroupValidator.patchValue({
        id: this.Bill.id,
        price: this.Bill.price,
        date: this.Bill.date,
        trip_id: this.Bill.trip_id,
      });
    })

  }

  update() {
    console.log(this.Bill)
    this.billService.update(this.formGroupValidator.value).subscribe((response: any) => {
      Swal.fire({
        title: 'Actualizado',
        icon: 'success'
      });

      this.router.navigate(["bill/list"]);
    })
  }


  create() {

    if (this.formGroupValidator.invalid) {
      Swal.fire({
        title: 'Formulario Incorrecto',
        icon: 'error',
        timer: 3000
      })
      return false
    }

    this.Bill = this.billData()

    console.log("Creando a " + JSON.stringify(this.Bill));

    this.billService.create(this.Bill).subscribe((response: any) => {
      Swal.fire({
        title: 'Creando',
        icon: 'success'
      });

      this.router.navigate(["bill/list"]);
    })
  }



  transformatDate(theDate: string): string {
    const theDateObject = new Date(theDate);
    const year = theDateObject.getFullYear();
    const month = (theDateObject.getMonth() + 1).toString().padStart(2, '0'); // Agrega ceros a la izquierda si es necesario
    const day = theDateObject.getDate().toString().padStart(2, '0'); // Agrega ceros a la izquierda si es necesario

    return `${year}-${month}-${day}`;
  }

}
