import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Console } from 'console';
import { PaymentMethod } from 'src/app/models/payment-method.model';
import { PaymentMethodService } from 'src/app/services/payment-method.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  paymentmethods:PaymentMethod[]

  constructor(private paymentmethodsService:PaymentMethodService,
              private router: Router) { }

  ngOnInit(): void {
    this.paymentmethodsService.list().subscribe((jsonResponse:any) => {
      this.paymentmethods = jsonResponse; 
      console.log(jsonResponse)
    });
  }

  create(){
    this.router.navigate(["payment-methods/create"])
  }

  edit(_id:number){
    console.log("Editando a " + _id)
    this.router.navigate(["payment-methods/update/" + _id])
  }

  delete(_id:number){
    console.log("Eliminando a " + _id)
    Swal.fire({
      title: 'Eliminar',
      text: "Está seguro que quiere eliminar el método de pago?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.paymentmethodsService.delete(_id).subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'Eliminación culminada exitosamente',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  
  }

}
