import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bill } from 'src/app/models/bill.model';
import { BillService } from 'src/app/services/bill.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  bills: Bill[]

  constructor(private billService: BillService,
    private router: Router) { }

  ngOnInit(): void {
    this.billService.list().subscribe((jsonResponse: any) => {
      this.bills = jsonResponse.data;
      this.bills.forEach(bill => {
        bill.date = this.formatearFecha(bill.date)
        console.log(bill)
      });

      console.log("Esto es bill: ", this.bills)
    });
  }

  create() {
    console.log("Hola")
    this.router.navigate(['bill/create'])
  }

  edit(id: number) {
    console.log("Editando a " + id)
    this.router.navigate(["bill/update/" + id])
  }


  formatearFecha(fechaString: string): string {
    let fecha: string = fechaString.replace('T', ' ').replace('Z', '');
    console.log(fecha)
    return fecha
  }

}

